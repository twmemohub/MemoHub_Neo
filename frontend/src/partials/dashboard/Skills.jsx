
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Import utilities
// import { useCookies } from "react-cookie";
import { tailwindConfig } from "../../utils/Utils";
import { skills } from "../../data/mockData";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Skills() {
  // const [cookies] = useCookies(["studentId"]);
  // const { studentId } = cookies;
  const studentId = "B11000000";
  const { labels, values } = skills;
  const chartData = {
    labels,
    datasets: [
      {
        label: "能力值",
        data: values,
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="flex">
      <header className="">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Skills
        </h2>
        
      </header>
      {studentId ? (
        <div className="flex align-center flex-col px-28">
          <div className="text-center my-4">學號：{studentId}</div>
          <Radar data={chartData} />
        </div>
      ) : (
        <div className="pt-20 text-center">尚未輸入數值，請先送出右方表單</div>
      )}
      
    </div>
  );
}

export default Skills;
