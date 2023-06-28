import Feed from '@components/Feed'

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Welcome to Promoptopia!
                <br className="max-mad:hidden" />
                <span className="orange_gradient text-center">
                    Power shit with AI
                </span>
            </h1>
            <p className="desc">
                Blah blah big data make GPT go Hitler style blah blah
            </p>
            <Feed />
        </section>
    )
}

export default Home
