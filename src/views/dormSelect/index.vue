<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.houseNum" placeholder="房间号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <el-select v-model="listQuery.location" placeholder="区域" clearable class="filter-item" style="width: 130px" @change="handleLocationChange">
        <el-option v-for="item in locationTypes" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.buildingName" placeholder="栋" clearable class="filter-item" style="width: 130px" :loading="loadingBuildings" @change="getFloors">
        <el-option v-for="item in buildings" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.floor" placeholder="楼层" clearable class="filter-item" style="width: 130px" :loading="loadingFloors">
        <el-option v-for="item in floors" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button> -->
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="房间号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass()">
        <template slot-scope="{row}">
          <span>{{ row.houseNum }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Location" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Building" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="floor" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.floor }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Bed" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.bed }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Remaining" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.bed-row.bookedNum }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button> -->
          <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            bookmark
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            unmark
          </el-button> -->
          <!-- <el-button v-if="selected != true" size="mini" type="primary" @click="handleChoose(row)">
            Choose
          </el-button> -->
          <el-button v-if="!selected" :disabled="!inTime" size="mini" type="primary" @click="handleChoose(row)">
            Choose
          </el-button>
          <el-button v-else size="mini" type="warning" @click="handleExchange(row)">
            Exchange
          </el-button>
        </template>

      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="学生" prop="exchangeTo">
          <el-select v-model="temp.exchangeTo" class="filter-item" placeholder="Please select">
            <el-option v-for="item in dormUsers" :key="item.id" :label="item.username" :value="item.username" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="Exchange">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, checkTime, checkUser, getDormUsers } from '@/api/article'
import { findBuilding, findFloor, selectRoom, exchangeRoom } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const locationTypes = [
  { key: '欣园', display_name: '欣园' },
  { key: '荔园', display_name: '荔园' },
  { key: '湖畔', display_name: '湖畔' },
  { key: '二期', display_name: '二期' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = locationTypes.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DormSelect',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      user: null,
      tableKey: 0,
      list: null,
      allList: [],
      buildings: [],
      floors: [],
      dormUsers: [],
      total: 0,
      listLoading: true,
      loadingBuildings: true,
      loadingFloors: true,
      selected: false,
      inTime: true,
      listQuery: {
        // importance: undefined,
        user: null,
        page: 1,
        limit: 20,
        houseNum: null,
        floor: null,
        buildingName: null,
        location: null,
        sort: '+'
      },
      templistQuery: {
        // importance: undefined,
        user: null,
        page: 1,
        limit: 20,
        houseNum: null,
        floor: null,
        buildingName: null,
        location: null,
        sort: '+'
      },
      importanceOptions: [1, 2, 3],
      locationTypes,
      sortOptions: [{ label: 'ID Ascending', key: '+' }, { label: 'ID Descending', key: '-' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        exchangeTo: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        exchangeTo: [{ required: true, message: 'student is required', trigger: 'change' }]
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    // this.getAllList().then(() => {
    //   this.getList()
    // })
    this.user = this.$store.getters.realUserName
    // console.log(localStorage.getItem('username'))
    this.getList()
    this.getBuildings()
    this.getFloors()
  },
  methods: {
    getList() {
      this.templistQuery = Object.assign({}, this.listQuery)
      this.templistQuery.page -= 1
      this.templistQuery.username = sessionStorage.getItem('username')
      this.listLoading = true
      checkUser(sessionStorage.getItem('username')).then(response => {
        this.selected = response.data
      })
      checkTime(sessionStorage.getItem('username')).then(response => {
        this.inTime = response.data
      })
      fetchList(this.templistQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    async handleLocationChange() {
      await this.getBuildings()
      await this.getFloors()
    },
    async getBuildings() {
      this.loadingBuildings = true
      findBuilding(this.listQuery).then(response => {
        this.buildings = response.data
        this.loadingBuildings = false
      })
    },
    async getFloors() {
      this.loadingFloors = true
      findFloor(this.listQuery).then(response => {
        this.floors = response.data
        setTimeout(() => {
          this.loadingFloors = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      // this.getAllList().then(() => {
      //   this.getList()
      // })
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      // const { prop, order } = data
      // // if (prop === 'id') {
      // //   this.sortByID(order)
      // // }
      this.sortByID()
    },
    sortByID(order) {
      // if (order === 'ascending') {
      //   this.listQuery.sort = '+'
      // } else if (order === 'descending') {
      //   this.listQuery.sort = '-'
      // } else {
      //   this.listQuery.sort = this.listQuery.sort === '+' ? '-' : '+'
      // }
      this.listQuery.sort = this.listQuery.sort === '+' ? '-' : '+'
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        exchangeTo: null
      }
    },
    handleChoose(row) {
      const data = Object.assign({}, row)
      data.user = sessionStorage.getItem('username')
      selectRoom(data).then(response => {
        this.getList()
        this.$notify({
          title: 'Success',
          message: 'Choose Successfully',
          type: 'success',
          duration: 2000
        })

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      // this.list.splice(index, 1)
    },
    handleExchange(row) {
      this.resetTemp()
      this.dialogStatus = 'exchange'
      getDormUsers(row.id).then(response => {
        this.dormUsers = response.data
      })
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    Exchange() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var data = {}
          data.username = sessionStorage.getItem('username')
          data.to = this.temp.exchangeTo
          console.log(data.username)
          console.log(data.to)
          exchangeRoom(data).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Apply Exchange Successfully',
              type: 'success',
              duration: 2000
            })
          })
          // this.$notify({
          //   title: 'Success',
          //   message: 'Update Successfully',
          //   type: 'success',
          //   duration: 2000
          // })
        }
      })
    },
    getSortClass: function() {
      const sort = this.listQuery.sort
      return sort === `+` ? 'ascending' : 'descending'
    }
  }
}
</script>
