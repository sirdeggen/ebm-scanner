import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
    const [counter, setCounter] = useState(0)
    const router = useRouter()

    async function getData() {
        try {
            setCounter(c => c + 1)
            const res = await fetch(`/api/1KPSTuJMCMRXrTWHfCwpiRZg1ALbJzh844`)
            if (res.status === 504) {
                return await getData()
            }
            if (res.status === 200) {
                setCounter(0)
                await router.push('/api/1KPSTuJMCMRXrTWHfCwpiRZg1ALbJzh844')
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div className={'container'}>
            <Head>
                <title>Empty Block Miner Data</title>
                <meta name="description" content="Gather data about any Miner by payout address" />
                <link rel="icon" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={'main'}>
                <h1 className={'title'}>Empty Block Miner Data</h1>
                <p className={'description'}>
                    Each time you navigate to the API page it will load all new block data which pays out to the address
                    in question. You can do this for any address, the default is a known EBM.
                </p>
                {!!counter && (
                    <p className={'warning'}>
                        {counter * 180} new blocks added to dataset... please wait, the csv will download when all
                        records have been gathered. This could take up to <b>30 mins</b> to gather all data.
                    </p>
                )}

                <p className={'description'}>
                    <button className={'button'} onClick={getData}>
                        Download Latest Data as CSV file
                    </button>
                </p>

                <footer className={'footer'}>
                    <p>Run by Bitcoin Association for BSV.</p>
                </footer>
            </main>
        </div>
    )
}
