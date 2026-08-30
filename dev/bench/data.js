window.BENCHMARK_DATA = {
  "lastUpdate": 1788090357882,
  "repoUrl": "https://github.com/bbhunter/jwt-hack",
  "entries": {
    "jwt-hack benchmarks": [
      {
        "commit": {
          "author": {
            "email": "hahwul@gmail.com",
            "name": "hahwul",
            "username": "hahwul"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "92aa09c0d9b77f62f78d0f143381c0b871746049",
          "message": "fix(crack): harden brute-force keyspace math against panics (#288)\n\n* fix(crack): harden brute-force keyspace math against panics\n\nThree crash-prone spots in the brute-force helpers:\n\n- `generate_bruteforce_payloads` computed the progress denominator with a\n  plain `pow`/`sum`, which overflows `usize` for a large charset or\n  `max_length` — panicking in debug/test builds and silently wrapping in\n  release. Reuse the saturating `estimate_combinations` helper and saturate\n  the u64->usize conversion instead of truncating.\n- `write_candidate_bytes` divided by `charset_size` without guarding the\n  empty-charset case (`n % 0` panic) and indexed a fixed\n  `[_; MAX_BRUTE_LENGTH]` buffer with an unchecked `length` (out-of-bounds\n  panic even in release). Add early-return guards for both.\n\nAdd a regression test for the empty-charset path.\n\n* style: rustfmt one-line total_combinations expression",
          "timestamp": "2026-08-30T16:37:15+09:00",
          "tree_id": "36766973bbffe2ca86ae12c9af74a520ca1b8ae5",
          "url": "https://github.com/bbhunter/jwt-hack/commit/92aa09c0d9b77f62f78d0f143381c0b871746049"
        },
        "date": 1788090357361,
        "tool": "cargo",
        "benches": [
          {
            "name": "encode_hs256",
            "value": 1183,
            "range": "± 19",
            "unit": "ns/iter"
          },
          {
            "name": "encode_hs256_compressed",
            "value": 12324,
            "range": "± 136",
            "unit": "ns/iter"
          },
          {
            "name": "decode",
            "value": 1354,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "verify_hs256",
            "value": 3248,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "verify_hs256_fastpath",
            "value": 1508,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "crack_dict_8_words",
            "value": 12021,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "crack_brute_len3_lower",
            "value": 26707834,
            "range": "± 66013",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}