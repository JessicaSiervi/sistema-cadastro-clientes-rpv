interface IEndereco{
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
}


export function formataEndereco({
 rua,
 numero,
 complemento,
 bairro,
 cidade,
 estado,
}: IEndereco): string{
    return `${rua}, ${numero} - ${complemento}, ${bairro}, ${cidade}/${estado}`
}

