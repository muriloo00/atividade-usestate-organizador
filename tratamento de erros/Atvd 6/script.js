function calcular(numero1, numero2, operacao) {
    const num1 = Number(numero1);
    const num2 = Number(numero2);

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        throw new Error('Erro: os valores informados devem ser números válidos.');
    }

    const operacoesPermitidas = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) {
                throw new Error('Erro: não é possível dividir por zero.');
            }
            return a / b;
        }
    };

    if (!operacoesPermitidas[operacao]) {
        throw new Error('Erro: operação inválida. Use +, -, * ou /.');
    }

    return operacoesPermitidas[operacao](num1, num2);
}

try {
    const resultado = calcular(10, 5, '+');
    console.log('Sucesso:', resultado);
} catch (erro) {
    console.error('Falha:', erro.message);
}

try {
    const resultado = calcular(10, 0, '/');
    console.log('Sucesso:', resultado);
} catch (erro) {
    console.error('Falha:', erro.message);
}

try {
    const resultado = calcular('abc', 3, '*');
    console.log('Sucesso:', resultado);
} catch (erro) {
    console.error('Falha:', erro.message);
}
