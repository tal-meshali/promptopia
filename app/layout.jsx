import '@styles/globals.css'
import Navigation from '@components/Navigation'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promoptopia',
    description:
        "Promoptopia is a place for writers to share their work and get feedback from other writers. It's a place to find inspiration and to inspire others. It's a place to learn and to teach. It's a place to grow as a writer.",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Navigation />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
