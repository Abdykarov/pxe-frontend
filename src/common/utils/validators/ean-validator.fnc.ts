// https://github.com/dominiklessel/node-barcoder

export class EanValidator {
    static validate = (barcode: string): boolean => {
        return true;

        const validChars = /^\d+$/;
        const validLength = 18;

        if (validChars.exec(barcode) === null || barcode.length !== validLength) {
            return false;
        }

        return EanValidator.validateGtin(barcode) && EanValidator.validateCharInTenthPosition(barcode);
    }

    static validateGtin = (value): boolean => {
        const barcode = value.substring(0, value.length - 1);
        const checksum = parseInt(value.substring(value.length - 1), 10);
        let calcSum = 0;
        let calcChecksum: number;

        barcode.split('').map((number, index) => {
            number = parseInt(number, 10);
            if (value.length % 2 === 0) {
                index += 1;
            }
            if (index % 2 === 0) {
                calcSum += number;
            } else {
                calcSum += number * 3;
            }
        });

        calcSum %= 10;
        calcChecksum = (calcSum === 0) ? 0 : (10 - calcSum);

        return calcChecksum === checksum;
    }

    static validateCharInTenthPosition = (ean: string): boolean => {
        if (ean.length < 10) {
            return true;
        }
        const forbiddenCharAtTenPosition = [0, 9];
        const tenPosition = 9;
        const chatAtTenPostion = ean.charAt(tenPosition);
        return !forbiddenCharAtTenPosition.includes(Number(chatAtTenPostion));
    }
}
