//  /* eslint-disable */
<template>
  <div class="hello">
     <h1>{{ msg }}</h1>
    <h2>Split Bill</h2>

    <div class="content1">
example 1;
    <pre>
      {"data":[
          {"day":1,
          "amount":50,
          "paidBy":"tanu",
          "friends":["kasun","tanu"]
          },
          {"day":2,
          "amount":100,
          "paidBy":"kasun",
          "friends":["kasun","tanu","shakeel"]
          },
          {"day":3,
          "amount":100,
          "paidBy":"shakeel",
          "friends":["shakeel","tanu","shakeel"]
          }
       ]}

    </pre>

    example 2
       <pre>
      {"data":[
          {"day":1,
          "amount":50,
          "paidBy":"tanu",
          "friends":["kasun","tanu","kasun"]
          },
          {"day":2,
          "amount":100,
          "paidBy":"kasun",
          "friends":["kasun","tanu","shakeel"]
          },
          {"day":3,
          "amount":120,
          "paidBy":"shakeel",
          "friends":["shakeel","tanu","shakeel","nimal"]
          }
       ]}

    </pre>


    <br>

    <form v-on:submit="readFromInput" method="post">


          <textarea v-model="inputJSON"  rows="20" cols="50">

          </textarea>
          <br>
          <button type="submit" class="button">Submit</button>

    </form>

    <br>
      {{error}}

      <br>
      <h3> or upload file </h3>

    <fileupload target="http://localhost:8000/upload" action="POST"></fileupload>


        <br>
  <button type="submit" @click="readFromFile"  class="button">Read From Uploaded File</button></div>
<div calss="content2">
    <h2>Output </h2>
    <h3>total days : {{days}} </h3>
    <h3>total amount spent : {{totalAmountSpent}} </h3>
    <br>
     <h3 class="subtitle">Each Person Spent Total </h3>
    <ul>
      <h3 v-for="item in eachPersonSpentArr" :key="item.name">
           {{ item.name }} = {{item.total |round}}
      </h3>


    </ul>
    <br>
     <h3 class="subtitle">Each Person Owe </h3>
    <ul>
    <h3 v-for="item in eachPerosnOws" :key="item.name">
           {{ item }}
        </h3>
        <br>
    </ul>

   <br>
     <h3 class="subtitle"> settelment combination </h3>
    <ul>
        <h3 v-for="item in settlementComb" :key="item.name">
           {{ item }}
        </h3>
        <br>
    </ul>
  </div>


  </div>

</template>

<script>
import axios from 'axios';
import FileUpload from 'vue-simple-upload/dist/FileUpload';


function isJSON(str) {
  if (typeof (str) !== 'string') {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  name: 'HelloWorld',
  components: {
    fileupload: FileUpload,
  },
  days: 0,
  data() {
    return {
      error: '',
      inputJSON: '',
      msg: 'Welcome to Share Bill Web App',
      log: '',
      days: '',
      totalAmountSpent: '',
      eachPersonSpentArr: '',
      eachPerosnOws: '',
      settlementComb: '',

    };
  },
  methods: {
    reset() {
      this.error = '';
      this.inputJSON = '';
      this.days = '';
      this.totalAmountSpent = '';
      this.eachPersonSpentArr = '';
      this.eachPerosnOws = '';
      this.settlementComb = '';
    },


    readFromInput(event) {
      if (isJSON(this.inputJSON) === false) {
        this.error = 'wrong json input';
        event.preventDefault();
      } else {
        axios
          .post(
            'http://localhost:8000/calculate',
            { data: this.inputJSON, fromFile: false }, // the data to post
            {
              headers: {
                'Content-type': 'application/json',
              },
            },
          )
          .then((response) => {
            this.reset();
            const {
              totalDays,
              totalAmountSpent,
              eachPersonSpentArr,
              eachPerosnOws,
              settlementComb,
            } = response.data;


            this.days = totalDays;
            this.totalAmountSpent = totalAmountSpent;
            this.eachPersonSpentArr = eachPersonSpentArr;
            this.eachPerosnOws = eachPerosnOws;
            this.settlementComb = settlementComb;
          })
          .catch((error) => {
            this.error = error.status;
          });
        event.preventDefault();
      }
    },
    readFromFile(event) {
      axios
        .post(
          'http://localhost:8000/calculate',
          { data: {}, fromFile: true }, // the data to post
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.reset();
          const {
            totalDays,
            totalAmountSpent,
            eachPersonSpentArr,
            eachPerosnOws,
            settlementComb,
          } = response.data;


          this.days = totalDays;
          this.totalAmountSpent = totalAmountSpent;
          this.eachPersonSpentArr = eachPersonSpentArr;
          this.eachPerosnOws = eachPerosnOws;
          this.settlementComb = settlementComb;
        })
        .catch(() => {

        });
      event.preventDefault();
      this.error = 'wrong json format';
    },

  },
  filters: {
    round(value) {
      if (!value) return '';

      return Math.round(value * 100) / 100;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.button2 {
  background-color: #008cba;
}

.subtitle {
  color: red;
}

.content1 {
float: left;
width: 50%;

}
.content2 {
float: left;
width: 50%;
}

</style>
