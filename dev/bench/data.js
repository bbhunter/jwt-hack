window.BENCHMARK_DATA = {
  "lastUpdate": 1788327961156,
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
      },
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
          "id": "8c17eff1aa62f51c127a50cfea94840439f22e5b",
          "message": "fix(scan/jwks): don't let token whitespace or one bad key file silently produce wrong results (#291)\n\n* fix(scan): trim token whitespace so weak-secret check isn't silently skipped\n\nA token routinely arrives with a trailing newline (read from a file or\npipe) or surrounding spaces (copy-paste). Because scan_token used the\ntoken verbatim, that whitespace landed in the signature segment and\nsilently broke HMAC verification: the weak-secret check then reported\n\"No common secret found\" for a token whose secret IS weak — a false\nnegative on the single most critical finding — while a leading space\nmade the whole scan hard-fail on base64 decoding.\n\nTrim the token once at the start of scan_token so every downstream check\nand the generated attack payloads see the canonical token. A compact\nJWT/JWE serialization never contains surrounding whitespace, so the trim\nis always safe. Adds a regression test asserting a whitespace-padded\ntoken yields the same findings (weak secret detected) as the clean one.\n\n* fix(jwks): trim token in verify/rotate and keep rotation resilient to bad keys\n\nTwo robustness bugs in the JWKS operations:\n\n1. A trailing newline on the token corrupted its base64url signature\n   segment, so jwks verify and jwks rotate wrongly reported valid keys\n   as INVALID. Trim the token in verify_with_jwks and test_key_rotation.\n\n2. test_key_rotation read each key with read_to_string(path)?, so a\n   single unreadable or non-UTF-8 key file (a DER key, a raw HMAC secret)\n   aborted the ENTIRE batch — every other key, including ones that would\n   verify the token, was left untested. Read the key as raw bytes, record\n   a per-key error and continue instead of aborting, and verify a\n   non-UTF-8 key as raw HMAC secret bytes (a JWK 'oct' secret is arbitrary\n   bytes) rather than discarding it.\n\nAdds regression tests: a binary key no longer aborts the batch, a binary\nHMAC secret verifies its own token, and a whitespace-padded token still\nverifies against its key.\n\n* fix(scan): match JWE 'dir' alg case-insensitively\n\nThe JWE Direct Encryption check compared alg == \"dir\" exactly while the\nJWE 'none' check next to it used eq_ignore_ascii_case. A case-varied alg\nsuch as \"DIR\" — exactly the parser-confusion shape this tool exists to\nflag — was therefore silently missed. Match 'dir' case-insensitively to\nmirror the 'none' check. Adds a regression test covering both casings.",
          "timestamp": "2026-09-02T09:33:19+09:00",
          "tree_id": "6a508499620eda99d822b52a1bcb0d798bf25084",
          "url": "https://github.com/bbhunter/jwt-hack/commit/8c17eff1aa62f51c127a50cfea94840439f22e5b"
        },
        "date": 1788327960178,
        "tool": "cargo",
        "benches": [
          {
            "name": "encode_hs256",
            "value": 1180,
            "range": "± 4",
            "unit": "ns/iter"
          },
          {
            "name": "encode_hs256_compressed",
            "value": 12147,
            "range": "± 261",
            "unit": "ns/iter"
          },
          {
            "name": "decode",
            "value": 1358,
            "range": "± 5",
            "unit": "ns/iter"
          },
          {
            "name": "verify_hs256",
            "value": 3284,
            "range": "± 17",
            "unit": "ns/iter"
          },
          {
            "name": "verify_hs256_fastpath",
            "value": 1499,
            "range": "± 6",
            "unit": "ns/iter"
          },
          {
            "name": "crack_dict_8_words",
            "value": 12075,
            "range": "± 45",
            "unit": "ns/iter"
          },
          {
            "name": "crack_brute_len3_lower",
            "value": 26604232,
            "range": "± 784261",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}