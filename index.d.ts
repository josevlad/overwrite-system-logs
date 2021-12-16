export class LoggerWrapper{
    public tracker: () => void;
    private _validateMethod: (level: string) => void | Error;
    public log: ({ line, filename, levels }: { line: number; filename: string; levels: any; }) => void;
    private _executeLog: ({ args, op, line, filename }: { args: any; op: string; line: number; filename: string; }) => void;
    private _customDebug: ({ args, line, filename }: { args: any; line: number; filename: string; }) => void;
    private _customInfo: ({ args, line, filename }: { args: any; line: number; filename: string; }) => void;
    private _customError: ({ args, line, filename }: { args: any; line: number; filename: string; }) => void;
    private _customWarn: ({ args, line, filename }: { args: any; line: number; filename: string; }) => void;
    public debug: (args: any) => void;
    public info: (args: any) => void;
    public error: (args: any) => void;
    public warn: (args: any) => void;
    private _checkLogLevel: (args: any) => void | Error;
}

export declare const logger : LoggerWrapper;
export declare function overwriteSystemLogs(): void;
