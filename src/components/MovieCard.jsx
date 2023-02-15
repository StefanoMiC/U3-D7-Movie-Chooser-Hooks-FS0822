import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";

const MovieCard = ({ movieTitle }) => {
  // state = {
  //   movieObj: null // inizialmente è null, ma dopo diventa un oggeto con un movie
  // };

  const [movieObj, setMovieObj] = useState(null);

  // useEffect(() => {
  //   console.log("Sono componentDidMount()");
  //   // qui effettueremo la nostra chiamata iniziale per 'Iron Man'
  //   fetchMovies();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    fetchMovies();
    console.log("with dependencies");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle]);

  // componentDidUpdate(prevProps, prevState) {
  //   // questo metodo intercetta qualsiasi aggiornamento del componente (fase di UPDATE)
  //   // quindi ad ogni cambio di state o props

  //   // prevProps e prevState sono i due parametri propri di componentDidUpdate
  //   // prevProps è la versione precedente di this.props
  //   // prevState è la versione precedente di this.state

  //   // nel nostro caso voglia che this.fetchMovies() venga invocato quando viene scelto un nuovo titolo in App.js,
  //   // quindi quando il nostro componente MovieCard riceve nuove props corrispondenti.

  //   console.log("Sono componentDidUpdate()");
  //   // quello che NON VOGLIAMO succeda è che venga invocato this.fetchMovies() più di una volta
  //   if (prevProps.movieTitle !== this.props.movieTitle) {
  //     //creare una condizione di guardia è OBBLIGATORIO quando si usa componentDidUpdate
  //     //la condizione è necessaria ad evitare loop infiniti di aggiornamento causati dal setState che fa aggiorare il componente.
  //     console.log("Props CAMBIATE");
  //     this.fetchMovies();
  //   } else {
  //     console.log("Props IDENTICHE");
  //   }

  // if(prevProps.somethingElse !== this.props.somethingElse) {
  // altra chiamata fetch o altra operazione...
  // }
  // }

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + movieTitle);
      // this.props.movieTitle inizialmente sarà sempre Iron Man
      if (response.ok) {
        // la chiamata è andata a buon fine
        // e posso aspettarmi il risultato nel body
        const data = await response.json();
        // console.log("MOVIES", data);
        // this.setState({ movieObj: data.Search[0] }); // <-- il mio risultato corretto
        setMovieObj(data.Search[0]);
        // dopo setState parte SEMPRE render() e, se c'è, componentDidUpdate
        console.log("setState effettuato");
      }
    } catch (error) {
      alert(error);
    }
  };

  // ogni cambio nelle prop o nello state provoca una nuova
  // invocazione di render()
  // this.fetchMovies() // <-- SBAGLIATO, perchè fetchMovies()
  // effettua un setState! e ad ogni cambio di stato render() di invoca di nuovo
  // --> INFINITE LOOP
  return (
    <>
      {movieObj ? (
        <Card>
          <Card.Img variant="top" src={movieObj.Poster} />
          <Card.Body>
            <Card.Title>{movieObj.Title}</Card.Title>
            <Card.Text>{movieObj.Year}</Card.Text>
            <Button variant="primary">{movieObj.imdbID}</Button>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="grow" variant="success" />
      )}
    </>
  );
};

export default MovieCard;
