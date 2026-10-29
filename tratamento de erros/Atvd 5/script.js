function validarNome(nome) {
    if (typeof nome !== 'string') {
        throw new Error('Nome inválido: o valor deve ser texto.');
    }

    const nomeLimpo = nome.trim().replace(/\s+/g, ' ');

    if (nomeLimpo.length === 0) {
        throw new Error('Nome inválido: o nome não pode estar vazio.');
    }

    if (nomeLimpo.length < 3) {
        throw new Error('Nome inválido: o nome deve ter pelo menos 3 caracteres.');
    }

    return nomeLimpo;
}

function validarIdade(valor) {
    if (valor === '' || valor === null || valor === undefined) {
        throw new Error('Idade inválida: o campo não pode estar vazio.');
    }

    if (typeof valor !== 'number' && typeof valor !== 'string') {
        throw new Error('Idade inválida: o valor deve ser numérico.');
    }

    const idade = Number(valor);

    if (Number.isNaN(idade)) {
        throw new Error('Idade inválida: o conteúdo deve ser numérico.');
    }

    if (idade < 0) {
        throw new Error('Idade inválida: a idade não pode ser negativa.');
    }

    if (idade > 120) {
        throw new Error('Idade inválida: a idade deve ser menor ou igual a 120.');
    }

    return idade;
}

function validarEmail(email) {
    if (typeof email !== 'string') {
        throw new Error('E-mail inválido: o valor deve ser texto.');
    }

    const emailLimpo = email.trim();

    if (emailLimpo.length === 0) {
        throw new Error('E-mail inválido: o campo não pode estar vazio.');
    }

    const partes = emailLimpo.split('@');
    if (partes.length !== 2) {
        throw new Error('E-mail inválido: o endereço deve conter um único @.');
    }

    const [local, dominio] = partes;

    if (local.length === 0 || dominio.length === 0) {
        throw new Error('E-mail inválido: o e-mail deve ter usuário e domínio.');
    }

    if (!dominio.includes('.')) {
        throw new Error('E-mail inválido: o domínio deve conter um ponto.');
    }

    return emailLimpo;
}
