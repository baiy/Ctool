import storage from "@/helper/storage"
import {axios} from '@/helper/proxy';
import {AxiosError} from 'axios';

type Language = {
    code: string,
    version: {
        name: string,
        value: string
    }[]
}
export const language: Language[] = [
    {
        "code": "java",
        "version": [
            {
                "name": "JDK 1.8.0_66",
                "value": "0"
            },
            {
                "name": "JDK 9.0.1",
                "value": "1"
            },
            {
                "name": "JDK 10.0.1",
                "value": "2"
            },
            {
                "name": "JDK 11.0.4",
                "value": "3"
            },
            {
                "name": "JDK 17.0.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "c",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "Zapcc 5.0.0",
                "value": "1"
            },
            {
                "name": "GCC 7.2.0",
                "value": "2"
            },
            {
                "name": "GCC 8.1.0",
                "value": "3"
            },
            {
                "name": "GCC 9.1.0",
                "value": "4"
            },
            {
                "name": "GCC 11.1.0",
                "value": "5"
            }
        ]
    },
    {
        "code": "c99",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "GCC 7.2.0",
                "value": "1"
            },
            {
                "name": "GCC 8.1.0",
                "value": "2"
            },
            {
                "name": "GCC 9.1.0",
                "value": "3"
            },
            {
                "name": "GCC 11.1.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "cpp",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "Zapcc 5.0.0",
                "value": "1"
            },
            {
                "name": "GCC 7.2.0",
                "value": "2"
            },
            {
                "name": "GCC 8.1.0",
                "value": "3"
            },
            {
                "name": "GCC 9.1.0",
                "value": "4"
            },
            {
                "name": "GCC 11.1.0",
                "value": "5"
            }
        ]
    },
    {
        "code": "cpp14",
        "version": [
            {
                "name": "g++ 14 GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "g++ 14 GCC 7.2.0",
                "value": "1"
            },
            {
                "name": "g++ 14 GCC 8.1.0",
                "value": "2"
            },
            {
                "name": "g++ 14 GCC 9.1.0",
                "value": "3"
            },
            {
                "name": "GCC 11.1.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "cpp17",
        "version": [
            {
                "name": "g++ 17 GCC 9.1.0",
                "value": "0"
            },
            {
                "name": "GCC 11.1.0",
                "value": "1"
            }
        ]
    },
    {
        "code": "php",
        "version": [
            {
                "name": "5.6.16",
                "value": "0"
            },
            {
                "name": "7.1.11",
                "value": "1"
            },
            {
                "name": "7.2.5",
                "value": "2"
            },
            {
                "name": "7.3.10",
                "value": "3"
            },
            {
                "name": "8.0.13",
                "value": "4"
            }
        ]
    },
    {
        "code": "perl",
        "version": [
            {
                "name": "5.22.0",
                "value": "0"
            },
            {
                "name": "5.26.1",
                "value": "1"
            },
            {
                "name": "5.26.2",
                "value": "2"
            },
            {
                "name": "5.30.0",
                "value": "3"
            },
            {
                "name": "5.34.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "python2",
        "version": [
            {
                "name": "2.7.11",
                "value": "0"
            },
            {
                "name": "2.7.15",
                "value": "1"
            },
            {
                "name": "2.7.16",
                "value": "2"
            },
            {
                "name": "2.7.18",
                "value": "3"
            }
        ]
    },
    {
        "code": "python3",
        "version": [
            {
                "name": "3.5.1",
                "value": "0"
            },
            {
                "name": "3.6.3",
                "value": "1"
            },
            {
                "name": "3.6.5",
                "value": "2"
            },
            {
                "name": "3.7.4",
                "value": "3"
            },
            {
                "name": "3.9.9",
                "value": "4"
            }
        ]
    },
    {
        "code": "ruby",
        "version": [
            {
                "name": "2.2.4",
                "value": "0"
            },
            {
                "name": "2.4.2p198",
                "value": "1"
            },
            {
                "name": "2.5.1p57",
                "value": "2"
            },
            {
                "name": "2.6.5",
                "value": "3"
            },
            {
                "name": "3.0.2",
                "value": "4"
            }
        ]
    },
    {
        "code": "go",
        "version": [
            {
                "name": "1.5.2",
                "value": "0"
            },
            {
                "name": "1.9.2",
                "value": "1"
            },
            {
                "name": "1.10.2",
                "value": "2"
            },
            {
                "name": "1.13.1",
                "value": "3"
            },
            {
                "name": "1.17.3",
                "value": "4"
            }
        ]
    },
    {
        "code": "scala",
        "version": [
            {
                "name": "2.12.0",
                "value": "0"
            },
            {
                "name": "2.12.4",
                "value": "1"
            },
            {
                "name": "2.12.5",
                "value": "2"
            },
            {
                "name": "2.13.0",
                "value": "3"
            },
            {
                "name": "2.13.6",
                "value": "4"
            }
        ]
    },
    {
        "code": "bash",
        "version": [
            {
                "name": "4.3.42",
                "value": "0"
            },
            {
                "name": "4.4.12",
                "value": "1"
            },
            {
                "name": "4.4.19",
                "value": "2"
            },
            {
                "name": "5.0.011",
                "value": "3"
            },
            {
                "name": "5.1.12",
                "value": "4"
            }
        ]
    },
    {
        "code": "sql",
        "version": [
            {
                "name": "SQLite 3.9.2",
                "value": "0"
            },
            {
                "name": "SQLite 3.21.0",
                "value": "1"
            },
            {
                "name": "SQLite 3.23.1",
                "value": "2"
            },
            {
                "name": "SQLite 3.29.0",
                "value": "3"
            },
            {
                "name": "3.37.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "pascal",
        "version": [
            {
                "name": "fpc 3.0.0",
                "value": "0"
            },
            {
                "name": "fpc-3.0.2",
                "value": "1"
            },
            {
                "name": "fpc-3.0.4",
                "value": "2"
            },
            {
                "name": "fpc-3.2.2",
                "value": "3"
            }
        ]
    },
    {
        "code": "csharp",
        "version": [
            {
                "name": "mono 4.2.2",
                "value": "0"
            },
            {
                "name": "mono 5.0.0",
                "value": "1"
            },
            {
                "name": "mono 5.10.1",
                "value": "2"
            },
            {
                "name": "mono 6.0.0",
                "value": "3"
            },
            {
                "name": "mono-6.12.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "vbn",
        "version": [
            {
                "name": "mono 4.0.1",
                "value": "0"
            },
            {
                "name": "mono 4.6",
                "value": "1"
            },
            {
                "name": "mono 5.10.1",
                "value": "2"
            },
            {
                "name": "mono 6.0.0",
                "value": "3"
            },
            {
                "name": "mono 6.12.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "haskell",
        "version": [
            {
                "name": "ghc 7.10.3",
                "value": "0"
            },
            {
                "name": "ghc 8.2.1",
                "value": "1"
            },
            {
                "name": "ghc 8.2.2",
                "value": "2"
            },
            {
                "name": "ghc 8.6.5",
                "value": "3"
            },
            {
                "name": "9.0.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "objc",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "GCC 7.2.0",
                "value": "1"
            },
            {
                "name": "GCC 8.1.0",
                "value": "2"
            },
            {
                "name": "GCC 9.1.0",
                "value": "3"
            },
            {
                "name": "GCC 11.1.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "swift",
        "version": [
            {
                "name": "2.2",
                "value": "0"
            },
            {
                "name": "3.1.1",
                "value": "1"
            },
            {
                "name": "4.1",
                "value": "2"
            },
            {
                "name": "5.1",
                "value": "3"
            },
            {
                "name": "5.5",
                "value": "4"
            }
        ]
    },
    {
        "code": "groovy",
        "version": [
            {
                "name": "2.4.6 JVM: 1.7.0_99",
                "value": "0"
            },
            {
                "name": "2.4.12 JVM: 9.0.1",
                "value": "1"
            },
            {
                "name": "2.4.15 JVM: 10.0.1",
                "value": "2"
            },
            {
                "name": "2.5.8 JVM: 11.0.4",
                "value": "3"
            },
            {
                "name": "3.0.9 JVM: 17.0.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "fortran",
        "version": [
            {
                "name": "GNU 5.3.0",
                "value": "0"
            },
            {
                "name": "GNU 7.2.0",
                "value": "1"
            },
            {
                "name": "GNU 8.1.0",
                "value": "2"
            },
            {
                "name": "GNU 9.1.0",
                "value": "3"
            },
            {
                "name": "GNU 11.1.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "brainfuck",
        "version": [
            {
                "name": "bfc-0.1",
                "value": "0"
            }
        ]
    },
    {
        "code": "lua",
        "version": [
            {
                "name": "5.3.2",
                "value": "0"
            },
            {
                "name": "5.3.4",
                "value": "1"
            },
            {
                "name": "5.3.5",
                "value": "2"
            },
            {
                "name": "5.4.3",
                "value": "3"
            }
        ]
    },
    {
        "code": "tcl",
        "version": [
            {
                "name": "8.6",
                "value": "0"
            },
            {
                "name": "8.6.7",
                "value": "1"
            },
            {
                "name": "8.6.8",
                "value": "2"
            },
            {
                "name": "8.6.9",
                "value": "3"
            },
            {
                "name": "8.6.12",
                "value": "4"
            }
        ]
    },
    {
        "code": "rust",
        "version": [
            {
                "name": "1.10.0",
                "value": "0"
            },
            {
                "name": "1.21.0",
                "value": "1"
            },
            {
                "name": "1.25.0",
                "value": "2"
            },
            {
                "name": "1.38.0",
                "value": "3"
            },
            {
                "name": "1.56.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "d",
        "version": [
            {
                "name": "DMD64 D Compiler v2.071.1",
                "value": "0"
            },
            {
                "name": "DMD64 D Compiler v2.088",
                "value": "1"
            },
            {
                "name": "DMD64 D Compiler v2.098",
                "value": "2"
            }
        ]
    },
    {
        "code": "r",
        "version": [
            {
                "name": "3.3.1",
                "value": "0"
            },
            {
                "name": "3.4.2",
                "value": "1"
            },
            {
                "name": "3.5.0",
                "value": "2"
            },
            {
                "name": "3.6.1",
                "value": "3"
            },
            {
                "name": "4.1.2",
                "value": "4"
            }
        ]
    },
    {
        "code": "verilog",
        "version": [
            {
                "name": "10.1",
                "value": "0"
            },
            {
                "name": "10.2",
                "value": "1"
            },
            {
                "name": "10.3",
                "value": "2"
            },
            {
                "name": "11",
                "value": "3"
            }
        ]
    },
    {
        "code": "cobol",
        "version": [
            {
                "name": "GNU COBOL 2.0.0",
                "value": "0"
            },
            {
                "name": "GNU COBOL 2.2.0",
                "value": "1"
            },
            {
                "name": "GNU COBOL 3.0",
                "value": "2"
            },
            {
                "name": "GNU COBOL 3.1.2",
                "value": "3"
            }
        ]
    },
    {
        "code": "dart",
        "version": [
            {
                "name": "1.18.0",
                "value": "0"
            },
            {
                "name": "1.24.2",
                "value": "1"
            },
            {
                "name": "1.24.3",
                "value": "2"
            },
            {
                "name": "2.5.1",
                "value": "3"
            },
            {
                "name": "2.14.4",
                "value": "4"
            }
        ]
    },
    {
        "code": "clojure",
        "version": [
            {
                "name": "1.8.0",
                "value": "0"
            },
            {
                "name": "1.9.0",
                "value": "1"
            },
            {
                "name": "1.10.1",
                "value": "2"
            },
            {
                "name": "1.10.3",
                "value": "3"
            }
        ]
    },
    {
        "code": "nodejs",
        "version": [
            {
                "name": "node 6.3.1",
                "value": "0"
            },
            {
                "name": "node 9.2.0",
                "value": "1"
            },
            {
                "name": "node 10.1.0",
                "value": "2"
            },
            {
                "name": "node 12.11.1",
                "value": "3"
            },
            {
                "name": "node 17.1.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "scheme",
        "version": [
            {
                "name": "Gauche 0.9.4",
                "value": "0"
            },
            {
                "name": "Gauche 0.9.5",
                "value": "1"
            },
            {
                "name": "Gauche 0.9.8",
                "value": "2"
            },
            {
                "name": "Gauche 0.9.10",
                "value": "3"
            }
        ]
    },
    {
        "code": "forth",
        "version": [
            {
                "name": "gforth 0.7.3",
                "value": "0"
            }
        ]
    },
    {
        "code": "octave",
        "version": [
            {
                "name": "GNU 4.0.0",
                "value": "0"
            },
            {
                "name": "GNU 4.2.1",
                "value": "1"
            },
            {
                "name": "GNU 4.4.0",
                "value": "2"
            },
            {
                "name": "GNU 5.1.0",
                "value": "3"
            },
            {
                "name": "GNU 6.4.0",
                "value": "4"
            }
        ]
    },
    {
        "code": "coffeescript",
        "version": [
            {
                "name": "1.11.1",
                "value": "0"
            },
            {
                "name": "2.0.0",
                "value": "1"
            },
            {
                "name": "2.3.0",
                "value": "2"
            },
            {
                "name": "2.4.1",
                "value": "3"
            },
            {
                "name": "2.6.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "fsharp",
        "version": [
            {
                "name": "4.1",
                "value": "0"
            },
            {
                "name": "4.5.0",
                "value": "1"
            }
        ]
    },
    {
        "code": "ocaml",
        "version": [
            {
                "name": "4.03.0",
                "value": "0"
            },
            {
                "name": "4.08.1",
                "value": "1"
            },
            {
                "name": "4.12.0",
                "value": "2"
            }
        ]
    },
    {
        "code": "factor",
        "version": [
            {
                "name": "8.25",
                "value": "0"
            },
            {
                "name": "8.28",
                "value": "1"
            },
            {
                "name": "8.29",
                "value": "2"
            },
            {
                "name": "8.31",
                "value": "3"
            }
        ]
    },
    {
        "code": "smalltalk",
        "version": [
            {
                "name": "GNU SmallTalk 3.2.92",
                "value": "0"
            }
        ]
    },

    {
        "code": "kotlin",
        "version": [
            {
                "name": "1.1.51 (JRE 9.0.1+11)",
                "value": "0"
            },
            {
                "name": "1.2.40 (JRE 10.0.1)",
                "value": "1"
            },
            {
                "name": "1.3.50 (JRE 11.0.4)",
                "value": "2"
            },
            {
                "name": "1.6.0 (JRE 17.0.1+12)",
                "value": "3"
            }
        ]
    },
    {
        "code": "erlang",
        "version": [
            {
                "name": "22.1",
                "value": "0"
            },
            {
                "name": "24",
                "value": "1"
            }
        ]
    },
    {
        "code": "haxe",
        "version": [
            {
                "name": "4.2.4",
                "value": "0"
            }
        ]
    }
]

export const getLanguage = (code: string) => {
    for (let item of language) {
        if (code === item.code) {
            return item
        }
    }
    throw new Error(`not found ${code} language`)
}

export const getConfig = () => {
    const config = storage.get<{ client_id: string, client_secret: string }>('code_run_config')
    if (config !== null) {
        return config
    }
    return {client_id: "", client_secret: ""}
}

export const setConfig = (client_id: string, client_secret: string) => {
    storage.setNoVersion('code_run_config', {client_id, client_secret})
}

export const getUsed = () => {
    return new Promise<number>((resolve, reject) => {
        const config = getConfig()
        if (config.client_secret === "" || config.client_id === "") {
            return reject("not found config")
        }
        axios().post<{ used: number }>(
            "https://api.jdoodle.com/v1/credit-spent",
            {
                clientId: config.client_id,
                clientSecret: config.client_secret
            }
        ).then((response) => {
            return resolve(Number(`${response.data.used}`))
        }).catch(function (error) {
            reject(error)
        });
    })
}
export type Result = { output: string, memory: number, cpuTime: number, error: string }
export const execute = async (lang: string, code: string, version: string) => {
    return new Promise<Result>((resolve, reject) => {
        const config = getConfig()
        if (config.client_secret === "" || config.client_id === "") {
            return reject('not found config')
        }

        axios().post<Result & { statusCode: number }>(
            "https://api.jdoodle.com/v1/execute",
            {
                clientId: config.client_id,
                clientSecret: config.client_secret,
                script: code,
                language: lang,
                versionIndex: version,
            }
        ).then((response) => {
            if (response.data.error) {
                reject(`[${response.data.statusCode}]${response.data.error}`)
            }
            return resolve({
                output: response.data.output,
                memory: response.data.memory,
                cpuTime: response.data.cpuTime,
                error: ""
            })
        }).catch((error) => {
            let err: any = error
            if (error instanceof AxiosError) {
                if (error.response?.data?.error) {
                    err = `[${error.response?.data.statusCode}]${error.response?.data.error}\n${error.message}`
                }
            }
            return reject(err)
        });
    })
}
