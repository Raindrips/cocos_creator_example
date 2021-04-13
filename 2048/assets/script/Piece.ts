const { ccclass, property } = cc._decorator;

@ccclass
export class Piece extends cc.Component {

    @property(cc.Label)
    public nLabel: cc.Label = null;

    public x: number;
    public y: number;
    private _n: number = 0;
    public get n() {
        return this._n;
    }
    public set n(value: number) {
        this._n = value;
        let color: cc.Color;
        let str: string;
        switch (value) {
            case 0:
                str = "";
                color = cc.color(49,49,49);
                break;
            case 2:
                str = "2";
                color = new cc.Color().fromHEX("#683202");
                break;
            case 4:
                str = "4";
                color = new cc.Color().fromHEX("#784212");
                break;
            case 8:
                str = "8";
                color = new cc.Color().fromHEX("#8E5109");
                break;
            case 16:
                str = "16";
                color = new cc.Color().fromHEX("#7D6608");
                break;
            case 32:
                str = "32";
                color = new cc.Color().fromHEX("#189A3B");
                break;
            case 64:
                str = "64";
                color = new cc.Color().fromHEX("#145A32");
                break;
            case 128:
                str = "128";
                color = new cc.Color().fromHEX("#0B5345");
                break;
            case 256:
                str = "256";
                color = new cc.Color().fromHEX("#0E6251");
                break;
            case 512:
                str = "512";
                color = new cc.Color().fromHEX("#1B4F72");
                break;
            case 1024:
                str = "1024";
                color = new cc.Color().fromHEX("#154360");
                break;
            case 2048:
                str = "2048";
                color = new cc.Color().fromHEX("#4A235A");
                break;
            case 4096:
                str = "4096";
                color = new cc.Color().fromHEX("#512E5F");
                break;
            case 8192:
                str = "8192";
                color = new cc.Color().fromHEX("#78281F");
                break;
            default:
                str = "开挂吧你";
                color = new cc.Color().fromHEX("#641E16");
                break;
        }
        this.nLabel.string = str;
        this.node.color = color;
        
        // this.nLabel.node.color = this.getHcolor(Math.random(),1);
    }

    public init(x: number, y: number, n: number) {
        this.x = x;
        this.y = y;
        this.n = n;
    }

    public randomNumber() {
        this.n = Math.random() < 0.9 ? 2 : 4;
    }

    private getHcolor(top: number, height: number) {
        let oneHeight = height / 6;
        let d = 0, rgbStr;
        let r = 0, g = 0, b = 0;
        if (top < oneHeight * 1) {
            d = (top / oneHeight) * 255;
            r = 255;
            g = 0;
            b = Math.round(d);
        } else if (top >= oneHeight && top < 2 * oneHeight) {
            d = 255 - ((top - oneHeight) / oneHeight) * 255;
            r = Math.round(d);
            g = 0;
            b = 255;
        } else if (top >= 2 * oneHeight && top < 3 * oneHeight) {
            d = ((top - 2 * oneHeight) / oneHeight) * 255;
            r = 0;
            g = Math.round(d);
            b = 255;
        } else if (top >= 3 * oneHeight && top < 4 * oneHeight) {
            d = 255 - ((top - 3 * oneHeight) / oneHeight) * 255;
            r = 0;
            g = 255;
            b = Math.round(d);
        } else if (top >= 4 * oneHeight && top < oneHeight * 5) {
            d = ((top - oneHeight * 4) / oneHeight) * 255;
            r = Math.round(d);
            g = 255;
            b = 0;
        } else {
            d = 255 - ((top - oneHeight * 5) / oneHeight) * 255;
            r = 255;
            g = Math.round(d);
            b = 0;
        }
        return cc.color(r, g, b);
    }
}