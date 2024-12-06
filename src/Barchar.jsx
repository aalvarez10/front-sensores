import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";



// eslint-disable-next-line react/prop-types
const Example = ({ data }) => {
  return (
    <div className="container">
      <LineChart
        width={900}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="x"
          stroke="#8884d8"
          //activeDot={{ r: 1 }}
        />
        <Line type="monotone" dataKey="y" stroke="#82ca9d" />
        <Line type="monotone" dataKey="z" stroke="#f43d43" />
      </LineChart>
    </div>
  );
};

export default Example;
