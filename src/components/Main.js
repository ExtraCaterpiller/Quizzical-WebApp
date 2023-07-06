function Main(props){
    return (
        <main className="Main">
            <div className="main--page">
                <h1 className="main--page--title">Quizzical</h1>
                <p className="main--page--text">Some description if needed</p>
                <button onClick={props.pageHandle} className="main--page--button">Start quiz</button>
            </div>
        </main>
    )
}

export default Main