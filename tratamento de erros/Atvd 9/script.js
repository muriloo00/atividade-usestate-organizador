function recuperarPreferencias() {
    const preferenciaPadrao = {
        tema: 'claro',
        tamanhoFonte: 16,
        notificacoes: true
    };

    try {
        const valorArmazenado = localStorage.getItem('preferencias');

        if (!valorArmazenado) {
            console.info('preferencias não encontrada no localStorage; usando padrão.');
            return preferenciaPadrao;
        }

        const dados = JSON.parse(valorArmazenado);

        if (!dados || Array.isArray(dados) || typeof dados !== 'object') {
            throw new Error('Formato incompatível: o valor salvo não é um objeto válido.');
        }

        const preferencias = {
            ...preferenciaPadrao,
            ...dados
        };

        return preferencias;
    } catch (erro) {
        console.error('Erro ao recuperar preferências:', erro);
        return preferenciaPadrao;
    }
}

console.log(recuperarPreferencias());
