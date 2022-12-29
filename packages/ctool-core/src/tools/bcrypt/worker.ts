import bcrypt from "bcryptjs";

const post = (method: string, data: any) => {
    let send = {method, data}
    console.log("worker send", send)
    self.postMessage({method, data});
}

const hash = ({input, rounds}) => {
    bcrypt.hash(input, rounds, (err, hash) => post('hash', {err, hash}));
}

const compare = ({input, hash}) => {
    bcrypt.compare(input, hash, (err, res) => post('compare', {err, res}));
}

self.addEventListener('message', function (e) {
    console.log("worker accept", e.data)
    const data = e.data;
    if (data.method === "hash") {
        return hash(data.data)
    }
    if (data.method === "compare") {
        return compare(data.data)
    }
}, false);
