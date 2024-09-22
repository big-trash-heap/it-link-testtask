import { DeserializatedError } from 'src/exceptions';
import { IDeserialization, ISerialization } from 'src/types';

const REGEXP_COLOR_HEX = /^#([0-9a-f]{3,4}|[0-9a-f]{6,8})$/;

export class RGBAColorVO implements ISerialization<string> {
  private _blue: number;
  private _green: number;
  private _red: number;
  private _alpha: number;

  private constructor(r: number, g: number, b: number, a: number) {
    this._red = r;
    this._green = g;
    this._blue = b;
    this._alpha = a;
  }

  public serialize(): string {
    return this.colorRGBAHex;
  }

  public get colorRGBHex() {
    return `#${this._red.toString(16).padStart(2, '0')}${this._green.toString(16).padStart(2, '0')}${this._blue.toString(16).padStart(2, '0')}`;
  }

  public get colorRGBAHex() {
    return `#${this._red.toString(16).padStart(2, '0')}${this._green.toString(16).padStart(2, '0')}${this._blue.toString(16).padStart(2, '0')}${this._alpha.toString(16).padStart(2, '0')}`;
  }

  public get colorRGBCss() {
    return `rgb(${this._red}, ${this._green}, ${this._blue})`;
  }

  public get colorRGBACss() {
    return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`;
  }

  public static fromHexString(colorHex: string): RGBAColorVO {
    const [r, g, b, a] = RGBAColorVO.hexStringToChannels(colorHex);
    const vo = new RGBAColorVO(r, g, b, a);

    return vo;
  }

  private static hexStringToChannels(
    colorHex: string,
  ): [r: number, g: number, b: number, a: number] {
    const hex = colorHex.toLowerCase();

    RGBAColorVO.validateHexString(hex);

    let r: string = '';
    let g: string = '';
    let b: string = '';
    let a: string = '';

    const hexChars = hex.slice(1);

    if (3 === hexChars.length) {
      r = hexChars[0] + hexChars[0];
      g = hexChars[1] + hexChars[1];
      b = hexChars[2] + hexChars[2];
      a = 'ff';
    } else if (4 === hexChars.length) {
      r = hexChars[0] + hexChars[0];
      g = hexChars[1] + hexChars[1];
      b = hexChars[2] + hexChars[2];
      a = hexChars[3] + hexChars[3];
    } else if (6 === hexChars.length) {
      r = hexChars[0] + hexChars[1];
      g = hexChars[2] + hexChars[3];
      b = hexChars[4] + hexChars[5];
      a = 'ff';
    } else if (8 === hexChars.length) {
      r = hexChars[0] + hexChars[1];
      g = hexChars[2] + hexChars[3];
      b = hexChars[4] + hexChars[5];
      a = hexChars[6] + hexChars[7];
    } else {
      /** should never happen */
      this.throwInvalidColorHex(colorHex);
    }

    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16)];
  }

  private static validateHexString(colorHex: string) {
    if (!REGEXP_COLOR_HEX.test(colorHex)) {
      this.throwInvalidColorHex(colorHex);
    }
  }

  private static throwInvalidColorHex(colorHex: string): never {
    throw new Error(`Invalid color: ${colorHex}`);
  }
}

export class RGBAColorVODeserializator
  implements IDeserialization<RGBAColorVO>
{
  public constructor(public serializatedValue: any) {}

  public deserialize(): RGBAColorVO {
    try {
      if (typeof this.serializatedValue !== 'string') {
        throw new DeserializatedError('Serializated color is not a string');
      }

      return RGBAColorVO.fromHexString(this.serializatedValue);
    } catch (error) {
      throw new DeserializatedError(error.message, { cause: error });
    }
  }

  public safeDeserialize():
    | { valid: false; error: Error; data: any }
    | { valid: true; data: RGBAColorVO } {
    try {
      const data = this.deserialize();
      return { valid: true, data };
    } catch (error) {
      return {
        valid: false,
        error,
        data: this.serializatedValue,
      };
    }
  }
}
