const total = Number(process.env.TEST_TOTAL ?? 1000);
const concurrency = Number(process.env.TEST_CONCURRENCY ?? 100);
const url = process.env.TEST_URL ?? 'http://localhost:4321/';
const latencies = [];
let next = 0;
let passed = 0;
let failed = 0;

async function worker() {
  while (next < total) {
    next += 1;
    const started = performance.now();
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      await response.arrayBuffer();
      latencies.push(performance.now() - started);
      if (response.ok) passed += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
latencies.sort((a, b) => a - b);
const p95 = latencies[Math.floor(latencies.length * 0.95)] ?? 0;

console.log(`Requests: ${total}`);
console.log(`Successful: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Local p95: ${Math.round(p95)} ms`);

if (failed > 0) process.exit(1);
