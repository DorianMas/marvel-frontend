const FavoritesPage = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-app-backend-dm.herokuapp.com/characters`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="fav-container">
      <div className="fav-character-container">{character}</div>
    </div>
  );
};

export default FavoritesPage;
