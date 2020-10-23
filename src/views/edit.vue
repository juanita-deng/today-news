<template>
  <div class="edit">
    <hm-headers>编辑资料</hm-headers>
    <!-- 头像 -->
    <div class="avator">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <!-- 头像裁剪遮罩 -->
    <div class="mask">
      <van-button type="primary" @click="showCropper = false" v-show="showCropper">取消</van-button>
      <van-button type="info" @click="cropper" v-show="showCropper">确定</van-button>
      <van-overlay :show="showCropper" />
    </div>
    <hm-navbar title="昵称" :content="userInfo.nickname" @click="showNameDialog" />
    <!-- 修改昵称 -->
    <van-dialog v-model="showNickName" title="修改昵称" show-cancel-button @confirm="editInfo({ nickname: nickname })">
      <van-field v-model="nickname" :clickable="true" placeholder="请输入用户昵称" />
    </van-dialog>
    <hm-navbar title="密码" :content="userInfo.password | filterPassword" @click="showPassWordDialog" />
    <!-- 修改密码 -->
    <van-dialog v-model="showPassWord" title="修改密码" show-cancel-button @confirm="editInfo({ password: password })">
      <van-field v-model="password" :clickable="true" placeholder="请输入密码" />
    </van-dialog>
    <hm-navbar title="性别" :content="userInfo.gender === 0 ? '女' : '男'" @click="showGenderDialog = true" />
    <!-- 修改性别 -->
    <van-dialog v-model="showGenderDialog" title="修改性别" show-cancel-button @confirm="editInfo({ gender: gender })">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="女" clickable @click="gender = '0'">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
          <van-cell title="男" clickable @click="gender = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <vueCropper ref="cropper" :auto-upload="false" :autoCrop="true" :img="option.img" :outputSize="option.size" :outputType="option.outputType" />
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
  name: 'edit',
  components: {
    VueCropper,
  },
  filters: {
    filterPassword(value) {
      if (!value) return '';
      return value.replace(/./g, '*');
    },
  },
  data() {
    return {
      userInfo: {
        nickname: '',
      },
      option: {
        img: '', // 裁剪图片的地址
        size: 1,
        outputSize: 1, // 裁剪生成图片的质量
      },
      showCropper: false,
      showNickName: false,
      showPassWord: false,
      showGenderDialog: false,
      nickname: '',
      password: '',
      gender: 1,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const id = localStorage.getItem('user_id');
      const res = await this.$axios.get('/user/' + id);
      // console.log('edituserInfo===>res', res);
      this.userInfo = res.data.data || {};
    },
    async afterRead(file) {
      // console.log('file', file);
      const fd = new FormData();
      fd.append('file', file.file);
      const res = await this.$axios.post('/upload', fd);
      // console.log('upload====>res', res);
      this.editInfo({ head_img: res.data.data.url });
    },
    async editInfo(param) {
      const id = localStorage.getItem('user_id');
      const res = await this.$axios.post('/user_update/' + id, param);
      // console.log('editInfo===>', res);
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.getUserInfo(); // 重新渲染
        this.$toast.success(message);
      }
    },
    showNameDialog() {
      this.showNickName = true;
      this.nickname = this.userInfo.nickname;
    },
    showPassWordDialog() {
      this.showPassWord = true;
      this.password = this.userInfo.password;
    },
    cropper() {
      this.showCropper = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  .avator {
    position: relative;
    .uploader {
      position: absolute;
      top: 2px;
      right: 40%;
      opacity: 0;
    }
    img {
      display: flex;
      justify-content: center;
      margin: 50px auto;
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }
  }
  .mask {
    position: relative;
    .van-button {
      position: absolute;
      top: 0;
    }
  }
  /deep/ .van-dialog__content {
    padding: 0 15px;
  }
  /deep/ .van-dialog__header {
    padding: 30px 0;
  }
}
</style>
