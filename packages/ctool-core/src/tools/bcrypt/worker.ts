import bcrypt from "bcryptjs";

// Helper function to send messages back to the main thread
const post = (method: string, data: any) => {
    let send = { method, data };
    console.log("worker send", send);
    self.postMessage({ method, data });
};

// Function to simulate different bcrypt versions in hashing
const hash = ({ input, rounds, version }: { input: string, rounds: number, version: string }) => {
    // Generate the salt
    let salt = bcrypt.genSaltSync(rounds);

    // Simulate version by replacing the prefix of the salt
    if (version === "2y") {
        salt = salt.replace(/\$2a\$/, "$2y$");
    } else if (version === "2b") {
        salt = salt.replace(/\$2a\$/, "$2b$");
    }

    // Hash the input with the modified salt
    bcrypt.hash(input, salt, (err, hash) => post("hash", { err, hash, version }));
};

// Function to compare input with hash
const compare = ({ input, hash }: { input: string, hash: string }) => {
    bcrypt.compare(input, hash, (err, res) => post("compare", { err, res }));
};

// Event listener to handle incoming messages
self.addEventListener("message", function(e) {
    console.log("worker accept", e.data);
    const data = e.data;
    if (data.method === "hash") {
        return hash(data.data);
    }
    if (data.method === "compare") {
        return compare(data.data);
    }
}, false);
