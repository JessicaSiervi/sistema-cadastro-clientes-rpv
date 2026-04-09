import { formataEndereco } from "@/utils";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { tr } from "zod/locales";

interface IDadosClientes {
    nome: string,
    email: string,
    cpfcnpj: string,
    sexo: string,
    cep: string,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: string,
    complemento: string,
}

interface IClientes {
    data: IDadosClientes[] | []
}

export const getServerSideProps = (async () => {
    const response = await fetch('http://localhost:3000/api/list/cliente')
    const data: IClientes = await response.json()
    return { props: { data } }
}) satisfies GetServerSideProps<{ data: IClientes }>
export default function ListarClientes({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    console.log('Usuário recuperado no SSR', data)
    return (

        <>

            <h1 className="text-4xl text-center">Página de listagem de clientes</h1>
            <div className="mx-auto max-w-6xl border border-zinc-300 rounded-xl p-4 mt-8">
                <table className="table-auto min-w-4xl w-full">
                    <thead>
                        <tr className="border-b border-zinc-400 grid grid-cols-12">
                            <th className="col-span-2 text-start text-xl">Documento</th>
                            <th className="col-span-3 text-start text-xl">Nome</th>
                            <th className="col-span-1 text-start text-xl pr-4">Sexo</th>
                            <th className="col-span-6 text-start text-xl">Endereço</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.data?.length > 0 ? (
                            <>

                                {data.data.map((cliente) => (
                                    <tr className="grid grid-cols-12 even:bg-zinc-600/30" key={cliente.cpfcnpj}>
                                        <td className="col-span-2 text-start text-sm">{cliente.cpfcnpj}</td>
                                        <td className="col-span-4 text-start text-sm">{cliente.nome}</td>
                                        <td className="col-span-1 text-start text-sm pr-4">{cliente.sexo}</td>
                                        <td className="col-span-5 text-start text-sm">  {formataEndereco({
                                            bairro: cliente.bairro,
                                            cidade: cliente.cidade,
                                            estado: cliente.estado,
                                            rua: cliente.rua,
                                            numero: cliente.numero,
                                            complemento: cliente.complemento
                                        })} </td>
                                    </tr>
                                ))}
                            </>
                        ) : (

                            <tr className="grid grid-cols-12">
                                <td className="col-span-12 text-center text-base p-4">Nenhum cliente encontrado.</td>
                            </tr>


                        )}

                    </tbody>
                    <tfoot>
                        <tr className="border-t border-zinc-300">
                            <td className="col-span-12 text-end py-2 font-bold pr-10"> Usuários cadastrados: {data.data.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}



