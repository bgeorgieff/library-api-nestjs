import { Token } from '../enums/token.enums';

export const generateTokenString = () => {
  const characters = Token.tokenVars;
  const stringLength = Token.tokenLength;

  let token = '';
  const charactersLength = characters.toString().length;
  for (let i = 0; i < stringLength; i++) {
    token += characters
      .toString()
      .charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
};
// export class GenerateTokenString {
//   characters = Token.tokenVars;
//   stringLength = Token.tokenLength;

//   generateTokenString() {
//     let token = '';
//     const charactersLength = this.characters.toString().length;
//     for (let i = 0; i < this.stringLength; i++) {
//       token += this.characters
//         .toString()
//         .charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return token;
//   }
// }
