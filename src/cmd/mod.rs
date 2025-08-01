use clap::{Parser, Subcommand};
use log::error;
use std::path::PathBuf;

mod crack;
mod decode;
mod encode;
mod payload;
mod verify;
mod version;

/// Parses command-line arguments in "key=value" format for custom header parameters
fn parse_key_value(s: &str) -> Result<(String, String), String> {
    let pos = s
        .find('=')
        .ok_or_else(|| format!("invalid KEY=value: no `=` found in `{s}`"))?;
    Ok((s[..pos].to_string(), s[pos + 1..].to_string()))
}

/// Command-line interface for the jwt-hack tool
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    /// Decodes a JWT token and displays its header, payload, and validation info
    Decode {
        /// JWT token to decode
        token: String,
    },

    /// Encodes JSON data into a JWT token with specified algorithm and signing options
    Encode {
        /// JSON data to encode
        json: String,

        /// Secret key for HMAC algorithms (HS256, HS384, HS512)
        #[arg(long)]
        secret: Option<String>,

        /// RSA or ECDSA private key in PEM format for asymmetric algorithms
        #[arg(long)]
        private_key: Option<PathBuf>,

        /// Algorithm to use
        #[arg(long, default_value = "HS256")]
        algorithm: String,

        /// Use 'none' algorithm (no signature)
        #[arg(long)]
        no_signature: bool,

        /// Add custom header parameter (format: key=value)
        #[arg(long, value_parser = parse_key_value)]
        header: Vec<(String, String)>,
    },

    /// Verifies a JWT token's signature and optionally validates its expiration claim
    Verify {
        /// JWT token to verify
        token: String,

        /// Secret key for HMAC algorithms (HS256, HS384, HS512)
        #[arg(long)]
        secret: Option<String>,

        /// RSA or ECDSA private key in PEM format for asymmetric algorithms
        #[arg(long)]
        private_key: Option<PathBuf>,

        /// Validate expiration claim (exp)
        #[arg(long)]
        validate_exp: bool,
    },

    /// Attempts to crack a JWT token using dictionary or bruteforce methods
    Crack {
        /// JWT token to crack
        token: String,

        /// Cracking mode, you can use 'dict' or 'brute'
        #[arg(short, long, default_value = "dict")]
        mode: String,

        /// Wordlist file (for dictionary attack)
        #[arg(short, long)]
        wordlist: Option<PathBuf>,

        /// Character list (for bruteforce attack)
        #[arg(long, default_value = "abcdefghijklmnopqrstuvwxyz0123456789")]
        chars: String,

        /// Concurrency level
        #[arg(short, long, default_value = "20")]
        concurrency: usize,

        /// Max length (for bruteforce attack)
        #[arg(long, default_value = "4")]
        max: usize,

        /// Use all CPU cores
        #[arg(long)]
        power: bool,

        /// Show testing log
        #[arg(long)]
        verbose: bool,
    },

    /// Generates various JWT attack payloads for security testing
    Payload {
        /// JWT token to use for payload generation
        token: String,

        /// A trusted domain for jku&x5u (e.g google.com)
        #[arg(long)]
        jwk_trust: Option<String>,

        /// An attack payload domain for jku&x5u (e.g hahwul.com)
        #[arg(long)]
        jwk_attack: Option<String>,

        /// jku&x5u protocol (http/https)
        #[arg(long, default_value = "https")]
        jwk_protocol: String,

        /// Target payload types (comma-separated: all,none,jku,x5u,alg_confusion,kid_sql,x5c,cty)
        #[arg(long, default_value = "all")]
        target: Option<String>,
    },

    /// Displays version information and project details
    Version,
}

/// Parses command-line arguments and executes the appropriate command
pub fn execute() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Decode { token }) => {
            decode::execute(token);
        }
        Some(Commands::Encode {
            json,
            secret,
            private_key,
            algorithm,
            no_signature,
            header,
        }) => {
            encode::execute(
                json,
                secret.as_deref(),
                private_key.as_ref(),
                algorithm,
                *no_signature,
                header.clone(),
            );
        }
        Some(Commands::Verify {
            token,
            secret,
            private_key,
            validate_exp,
        }) => {
            verify::execute(
                token,
                secret.as_deref(),
                private_key.as_ref(),
                *validate_exp,
            );
        }
        Some(Commands::Crack {
            token,
            mode,
            wordlist,
            chars,
            concurrency,
            max,
            power,
            verbose,
        }) => {
            crack::execute(
                token,
                mode,
                wordlist,
                chars,
                *concurrency,
                *max,
                *power,
                *verbose,
            );
        }
        Some(Commands::Payload {
            token,
            jwk_trust,
            jwk_attack,
            jwk_protocol,
            target,
        }) => {
            payload::execute(
                token,
                jwk_trust.as_deref(),
                jwk_attack.as_deref(),
                jwk_protocol,
                target.as_deref(),
            );
        }
        Some(Commands::Version) => {
            version::execute();
        }
        None => {
            error!("No command specified. Use --help for usage information.");
        }
    }
}
