type bonus = {
  name: string;
  description: string;
};

const BonusPicker = (props: { data: bonus[] }) => {
  console.log(props.data);
  return <div></div>;
};

export default BonusPicker;
