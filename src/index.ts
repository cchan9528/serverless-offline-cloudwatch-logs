import type { Serverless } from 'serverless/aws';

export class ServerlessOfflineCloudwatchLogs {
  serverless: Serverless;
  options: any;

  commands: {};
  hooks: { [key: string]: Function }

  constructor(serverless: Serverless, options: any) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      hello: {
        usage: "Basic command",
        lifecycleEvents: ["hello", "world"],
        options: {
          message: {
            usage:
              "Basic way to use an option. Pass on CLI as --message or -m. " + 
              "Access in object with this.options.message and this.options.m, respectively" ,
            required: true,
            shortcut: "m",
          },
        },
        commands: {
            nested: {
                usage: "A basic way to define nested command",
                lifecycleEvents: ["hello"],
                options: {
                    message : {
                        usage:"Nested option. Available in same way as non-nested option.",
                        required: true,
                        shortcut: "m"
                    }
                }
            }
        }
      },
    };

    this.hooks = {
      // 'sls offline' Events
      'before:offline:start': this.beforeHello.bind(this),
      'after:offline:start': this.afterWorld.bind(this),

      // 'sls offline start' Events
      'before:offline:start:init': this.beforeHello.bind(this),
      'after:offline:start:end': this.afterWorld.bind(this),
    };
  }

  beforeHello() {
    console.log("Before welcome");
  }

  onHello() {
    console.log("Welcome, user!");
  }

  onWorld() {
      if (this.options.message) {
        console.log(`${this.options.message}`);
      }
      if (this.options.m) {
        console.log(`${this.options.m}`);
      }
  }

  afterWorld() {
    console.log("After world");
  }
}
