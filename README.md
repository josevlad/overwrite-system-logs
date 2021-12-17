# Overwrite System Logs
Library with functionality that overwrites all console methods to give a more precise format. Configuration based on winston dependency.

## How to use

```
overwrite-system-logs-tests
├── package.json
└── src
    ├── index.js
    └── index.ts
```

```js
// src/index.js
require('overwrite-system-logs').overwriteSystemLogs();

const logsTest = () => {
    const helloWorld = 'hello world from overwrite-system-logs';
    console.log({ helloWorld });
    console.log('Test message');
};

logsTest();
```

```ts
// src/index.ts
import { overwriteSystemLogs } from 'overwrite-system-logs';

overwriteSystemLogs();

const logsTest = (): void => {
    const helloWorld: string = 'hello world from overwrite-system-logs';
    console.log({ helloWorld });
    console.log('Test message');
};

logsTest();
```

### Output:

```console
2021-12-15T15:34:47.433Z INFO [ src/index.js 5:5 | object ]: {"helloWorld":"hello world from overwrite-system-logs"}
2021-12-15T15:34:47.434Z INFO [ src/index.js 6:5 | string ]: Test message

2021-12-15T15:34:50.065Z INFO [ src/index.ts 7:5 | object ]: {"helloWorld":"hello world from overwrite-system-logs"}
2021-12-15T15:34:50.066Z INFO [ src/index.ts 8:5 | string ]: Test message
```

### Log output elements and structure

```console
<dateToISOString> <INFO|WARN|ERROR> [ <folder/file{.js|.ts}> <line>:<position> ]: <mensaje>
```

## Configuration
It is necessary to provide an **environment variable** called **LOG_LEVEL** and assign it a value, in case it is not defined, the library takes by default the level of log info

Log levels:
- error
- warn
- info
- debug

Ordered from most important to least important. If the value defined in **LOG_LEVEL** is none of these, an exception will be thrown.

If you want the objects to have a pretty-print, just provide another environment variable called **LOG_PRETTY** that represents the space argument. [see documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_space_argument)

## Dependencias
This logger works using as dependency the Winston library
[link](https://www.npmjs.com/package/winston)
