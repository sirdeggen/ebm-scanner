import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
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
                <p className={'warning'}>
                    This will take up to <b>30 mins</b> to gather all data.
                </p>

                <p className={'description'}>
                    <button className={'button'} onClick={() => router.push('/api/1KPSTuJMCMRXrTWHfCwpiRZg1ALbJzh844')}>
                        Download Latest Data as CSV file
                    </button>
                </p>

                <footer className={'footer'}>
                    <p>Run by Bitcoin Association Engineering Team.</p>
                </footer>
            </main>
        </div>
    )
}
