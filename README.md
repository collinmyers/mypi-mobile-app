## Important Notes
1. There is a .env.example file include, please rename this to .env
2. The .env can only be used in development, in a production build you must specify the values in the eas.json
3. In order to build a dev or preview build using the .env you must conmment out line 32 for the .env in the gitignore as eas follows your gitignore.
4. Anywhere in app.json, eas.json, and google-services.json you see **<add-yours-here>**, you must provide values for your project/account/etc. All other values can remain the same.
5. This project uses ESLint to adhere to coding practices/standards, you can find this in the Extensions Tab if you are using VSCode
6. For the environment variable "EXPO_PUBLIC_APPROVED_NON_PROFIT" this must be either true or false to work.