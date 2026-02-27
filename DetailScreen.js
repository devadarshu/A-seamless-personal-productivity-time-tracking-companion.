// Quick logic check: Ensuring the detail screen fetches the right item
const DetailScreen = ({ route }) => {
  const { itemId } = route.params; // Get ID from navigation
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Logic to fetch detail data based on itemId
    fetchData(itemId).then(data => setItem(data));
  }, [itemId]);

  if (!item) return <LoadingSpinner />;

  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};
