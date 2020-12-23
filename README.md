# Capstone

# Zokrates

docker run -v /Users/paulallen/Documents/Projects/blockchain/submissions/Capstone:/home/zokrates/code -ti zokrates/zokrates /bin/bash
zokrates compile -i square.code
zokrates setup
zokrates compute-witness -a 337 113569
zokrates generate-proof
zokrates export-verifier
