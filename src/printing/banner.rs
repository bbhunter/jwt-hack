// Banner module for jwt-hack
use crate::printing::{out, VERSION};

/// Display the banner for jwt-hack
pub fn banner() {
    out("   d8p 8d8   d88 888888888          888  888 ,8b.     doooooo 888  ,dP ");
    out("   88p 888,o.d88    '88d     ______ 88888888 88'8o    d88     888o8P'  ");
    out("   88P 888P`Y8b8   '888      XXXXXX 88P  888 88PPY8.  d88     888 Y8L ");
    out("88888' 88P   YP8 '88p               88P  888 8b   `Y' d888888 888  `8p");
    out("-------------------------");
    out(&format!("Hack the JWT(JSON Web Token) | by @hahwul | {}", VERSION));
}