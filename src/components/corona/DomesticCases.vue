<template>
  <div>
    <ul class="graph-list">
      <li>
        <h3>누적 확진/사망자 추이</h3>
        <ChartGraph :chartOptions="DomesticCases" :key="caseKey" />
      </li>
      <li>
        <h3>확진자 대비 사망자</h3>
        <ChartGraph :chartOptions="DomesticCompare" :key="compareKey" />
      </li>
    </ul>
  </div>
</template>

<script>
import ChartGraph from "../charts/ChartGraph.vue";
import coronaMixin from "@/mixins/coronaMixin";
import moment from "moment";

export default {
  name: "DomesticCases",
  mixins: [coronaMixin],
  components: { ChartGraph },
  mounted() {
    this.fetchDomestic();
  },
  data() {
    return {
      caseKey: 0,
      compartKey: 0,
      monthDifference: 5,
      domesticData: [],
    };
  },
  computed: {
    DomesticCases() {
      return {
        type: "line",
        labels: this.domesticData.map((dom) =>
          dom.Date.split("T")[0].substr(0, 7)
        ),
        datasets: [
          {
            data: this.domesticData.map((dom) => dom.Confirmed),
            label: "확진자",
            borderWidth: 1,
            backgroundColor: ["rgba(54,162,235,0.2)"],
            borderColor: ["rgba(54,162,235,1)"],
          },
          {
            data: this.domesticData.map((dom) => dom.Deaths),
            label: "사망자",
            borderWidth: 1,
            backgroundColor: ["rgba(255,99,132,0.2)"],
            borderColor: ["rgba(255,99,132,1)"],
          },
        ],
      };
    },
    DomesticCompare() {
      const lastMonth = this.domesticData[this.domesticData.length - 1] || {};
      const deaths = lastMonth.Deaths;
      const confirmed = lastMonth.Confirmed;
      const data = [deaths, confirmed];

      return {
        type: "doughnut",
        labels: ["사망자", "확진자"],
        datasets: [
          {
            data: data,
            label: "확진자 대비 사망자",
            borderWidth: 1,
            backgroundColor: ["rgba(255,99,132,0.2)", "rgba(54,162,235,0.2)"],
            borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)"],
          },
        ],
      };
    },
  },
  watch: {
    //computed의 값에 변화가 생기면 key를 증가시킨다. mounted된 후 그래프의 값이 변화해서리..
    DomesticCases: {
      handler() {
        this.caseKey++;
      },
      deep: true,
    },
    DomesticCompare: {
      handler() {
        this.compareKey++;
      },
      deep: true,
    },
  },
  methods: {
    async fetchDomestic() {
      const to = moment().format("YYYY-MM-DD");
      const from = moment()
        .subtract(this.monthDifference, "months")
        .format("YYYY-MM-DD");
      const params = { to, from };

      const url = "https://api.covid19api.com/live/country/south-korea";
      const domestic = await this.fetchData("get", url, params);

      //원하는 날짜의 object만 가져오기
      this.setDomesticData(domestic);
    },
    setDomesticData(domestic) {
      let pick = 0;
      const targetDates = [];
      while (pick < this.monthDifference) {
        targetDates.push(
          moment().subtract(pick, "months").utc().format().split("T")[0]
        );
        pick++;
      }
      this.domesticData = domestic.filter((dom) =>
        targetDates.includes(dom.Date.split("T")[0])
      );
      console.log(this.domesticData, "domesticData");
    },
  },
};
</script>

<style scoped>
.graph-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  list-style: none;
}
</style>
