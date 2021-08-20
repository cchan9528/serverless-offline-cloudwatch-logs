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
      "before:welcome:hello": this.beforeHello.bind(this),
      "welcome:hello": this.onHello.bind(this),
      "welcome:world": this.onWorld.bind(this),
      "after:welcome:world": this.afterWorld.bind(this),
      "before:welcome:nested:hello" : this.beforeHello.bind(this),
      "welcome:nested:hello" : this.onWorld.bind(this),
      "after:welcome:nested:hello" : this.beforeHello.bind(this)
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
