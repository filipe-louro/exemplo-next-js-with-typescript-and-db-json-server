'use client'
import {useCallback, useEffect, useState} from 'react'
import {StatusDaLista} from '@/enums/StatusDaLista'
import {PropriedadesDaPaginaDeLista, ValoresListados} from '@/interfaces/InterfacesDaLista'

const List = ({lista}: PropriedadesDaPaginaDeLista) => {
    const [valoresDaLista, setValoresDaLista] = useState<ValoresListados[]>(lista || [])

    const mudarEstadoDaLista = useCallback(async (id: number) => {
        const listaParaMudar = valoresDaLista.map(lista => lista.id === id ? {
            ...lista,
            completed: !lista.completed
        } : lista)
        setValoresDaLista(listaParaMudar)

        await fetch(`http://localhost:4000/list/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: !valoresDaLista.find(lista => lista.id === id)?.completed})
        })
    }, [valoresDaLista])

    const fetchData = useCallback(async () => {
        await fetch('http://localhost:4000/list', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(async (response) => {
            const data: ValoresListados[] = await response.json()
            setValoresDaLista(data)
        })
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {
            await fetchData()
        })

        return () => clearTimeout(timer)
    }, [fetchData])

    return (
        <div>
            <h1>
                Lista de Titulos
            </h1>
            <ul>
                {valoresDaLista.map(lista => (
                    <li key={lista.id}>
                        <h3>{lista.title}</h3>
                        <button onClick={() => mudarEstadoDaLista(lista.id)}>
                            {lista.completed ? StatusDaLista.COMPLETED : StatusDaLista.INCOMPLETE}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List