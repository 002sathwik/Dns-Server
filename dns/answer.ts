import { DNSClass, DNSType } from "./question";

export interface IDNSAns {
    name: string;
    type: DNSType;
    classCode: DNSClass;
    ttl: number;
    data: string;
}

class DNSAnswer {
    static write(answers: IDNSAns[]) {
        return Buffer.concat(answers.map(answer => {
            const { name, type, classCode, ttl, data } = answer;
            const str = name
                .split('.')
                .map((n) => `${String.fromCharCode(n.length)}${n}`)
                .join("");
            const typeAndClass = Buffer.alloc(10);
            typeAndClass.writeInt16BE(type);
            typeAndClass.writeInt16BE(classCode, 2);
            typeAndClass.writeInt32BE(ttl, 4);
            typeAndClass.writeInt16BE(data.length, 8);
            return Buffer.concat([Buffer.from(str + '\0', 'binary'), typeAndClass, Buffer.from(data + "\0", 'binary')]);
        }))
    };
}


export default DNSAnswer;