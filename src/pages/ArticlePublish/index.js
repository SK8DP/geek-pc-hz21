import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Button, Space, Input, Radio, Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'; //富文本编辑器组件
import 'react-quill/dist/quill.snow.css';
import { baseURL } from 'utils/request';
import { addArticle, getArticleById, updateArticle } from 'api/article'

export default class ArticlePublish extends Component {
  state = {
    //文章的封面类型
    type: 1,
    //用于控制上传的图片以及图片的显示以及图片的默认展示
    fileList: [
      //{url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',}, //刚登录进来时的回显图片
    ],
    showPreview: false, //是否显示预览图
    previewUrl: '', //显示什么预览图
    id: this.props.match.params.id, //从url里提取出来的可变参数id //由Layout组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id //match是路由直接传递的经典老三样(history、location、match)之一，如果连这都不知道，就太他妈拉了
  }
  formRef = React.createRef() //这个ref用于拿到Form组件的实例，进而使用其实例方法。关于Form组件的实例方法请见https://ant.design/components/form-cn/
  render() {
    //console.log(this.props.match);
    const { type, fileList, previewUrl, showPreview, id } = this.state
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>{/*由Layout组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id，所以这里的内容也要根据url里有无id来做出对应的改变*/}
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }} //意思是让表单里的label的宽度为4个栅格，即页面总宽度的六分之一*/}{/*labelCol用于通过栅格系统控制表单里的label元素，而wrapperCol用于通过栅格系统控制表单里的非label元素。关于这部分请去通读ant-design文档里的Form组件部分和Grid组件部分
            size='large'
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{
              content: '',//此属性必须提供，否则富文本组件报错
              type: type,
            }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章的标题不能为空',
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道',
                },
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name='type'>
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>{/*wrapperCol={{ offset: 4 }意思是让当前这个Form.Item向右偏移4个栅格，即页面总宽度的六分之一*/}{/*labelCol用于通过栅格系统控制表单里的label元素，而wrapperCol用于通过栅格系统控制表单里的非label元素。关于这部分请见ant-design文档里的Form组件部分并逐行通读文档里的Grid组件部分*/}
              {type !== 0 && (//当你选的封面图片数量大于0时，才显示上传图标，否则就隐藏
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  action={`${baseURL}upload`} //action用于指定上传的url。注意：由于这里是通过Upload组件进行上传请求，并没有通过axios，所以我们在request.js里给axios配置的baseURL无法对这里生效，所以这里必须拼接出完整的url，不能只给个/upload
                  name='image' //name用于指定上传给后台的图片的属性名，详见接口文档http://geek.itheima.net/api-pc.html#u4e0au4f20u56feu72470a3ca20id3du4e0au4f20u56feu72473e203ca3e
                  onChange={this.uploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length < type && <PlusOutlined />}{/*功能：控制上传图片的数量，图片上传数量必须和type相匹配*/}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '文章的内容不能为空',
                },
              ]}
            >
              <ReactQuill
                theme='snow'
                placeholder='请输入文章的内容'
              ></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}> {/*wrapperCol={{ offset: 4 }意思是让当前这个Form.Item向右偏移4个栅格，即页面总宽度的六分之一*/}{/*labelCol用于通过栅格系统控制表单里的label元素，而wrapperCol用于通过栅格系统控制表单里的非label元素。关于这部分请见ant-design文档里的Form组件部分并逐行通读文档里的Grid组件部分*/}
              <Space>
                <Button type='primary' htmlType='submit' size="large">
                  {id ? '编辑文章' : '发布文章'}{/*由Layout组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id，所以这里的内容也要根据url里有无id来做出对应的改变*/}
                </Button>
                <Button size='large' onClick={this.addDraft}> {/*注意：虽然这个按钮也是要往后台提交数据，但是这里不能再加htmlType='submit'属性了，因为“发布文章”按钮已经加过了，这里再加的话，onFinish()函数就分不清谁是谁了，这里就通过onClick()来控制行为即可*/}
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {/*这个Modal组件是弹窗，用于显示预览的图片*/}
        <Modal
          open={showPreview}
          title="图片预览"
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewUrl}
          />
        </Modal>
      </div>
    )
  }

  async componentDidMount() { //主要用于编辑文章时的数据回显
    //console.log(this.props);
    if (this.state.id) { //如果当前的编辑文章模式 //由Layout组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id，所以这里也要先判断url里是否有id
      const res = await getArticleById(this.state.id) //获取文章详情
      //console.log('fuck', res);
      const values = {
        ...res.data,
        type: res.data.cover.type, //我觉得这行可以不写，因为和下方的setState()里的代码重复了，但也无所谓了，不影响功能
      }
      this.formRef.current.setFieldsValue(values) //把上一步获取到的文章详情设置给表单(据我分析其实就相当于是设置给了表单的initialValues属性)，进而实现文本内容的回显，但是这里只包含文本内容的回显，并不包含图片内容的回显，图片内容的回显需要通过下方的fileList //setFieldsValue()是Form()组件的实例方法，详见2-10-04以及文档https://ant.design/components/form-cn/
      const fileList = res.data.cover.images.map((item) => { //把res里的图片数据重塑成fileList里的合法格式
        return {
          url: item
        }
      })
      this.setState({//将图片信息设置给fileList，进而实现图片的回显。至此，文本的回显和图片的回显就都实现了
        fileList,
        type: res.data.cover.type,
      })
    }
  }

  changeType = (e) => {//当改变了封面图数量就会触发此函数
    this.setState({
      type: e.target.value,
      fileList: [],//每当切换了type就得把fileList置空，这样才能避免切换完type但是提交的图片却还没变的bug，详见2-9-13
    })
  }

  handlePreview = (file) => {//用于控制预览图状态及数据 //上传图片后，点击了图片上的“预览文件”就会触发这个函数
    //console.log(file)
    const url = file.url || file.response.data.url //uploadImage()存到fileList里的文件和fileList里预存的用于回显的文件的格式不一样，所以这里对路径要加以区分以防取不到，详见2-9-14
    this.setState({
      showPreview: true, //让文件预览图显示出来
      previewUrl: url, //设置预览图
    })
  }

  beforeUpload = (file) => { //用于上传前的校验，校验上传的图片格式和大小
    //console.log(file);
    if (file.size >= 1024 * 500) {
      message.warn('上传的文件不能超过500kb')
      return Upload.LIST_IGNORE //文件不合规则不予展示且不予上传，详见文档https://ant.design/components/upload-cn/
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或者png的图片')
      return Upload.LIST_IGNORE //文件不合规则不予展示且不予上传，详见文档https://ant.design/components/upload-cn/
    }
    return true
  }

  handleCancel = () => { //当关闭预览器就会触发此函数
    this.setState({
      showPreview: false,
      previewUrl: ''
    })
  }

  uploadImage = ({ fileList }) => {//fileList就解构出了最新状态的上传的图片们，详见文档https://ant.design/components/upload-cn/#onChange //上传图片就会触发此函数
    this.setState({ //上传完当然就把这最新的数据存进State里
      fileList,
    })
    //console.log(fileList);
    //console.log('上传完成');
  }

  async save(values, draft) { //校验表单信息、发起请求提交数据 //draft表示是否存为草稿，详见接口文档http://geek.itheima.net/api-pc.html#u53d1u8868u6587u7ae00a3ca20id3du53d1u8868u6587u7ae03e203ca3e //下方的onFinish()和addDraft()将会调用此函数
    const { fileList, type } = this.state
    if (fileList.length !== type) {
      return message.warn('上传的图片数量不正确')
    }
    //根据fileList得到上传的图片url
    const images = fileList.map((item) => {
      return item.url || item.response.data.url //uploadImage()存到fileList里的文件和fileList里预存的用于回显的文件的格式不一样，所以这里对路径要加以区分以防取不到，详见2-9-14和2-9-17
    })
    //console.log(images);
    if (this.state.id) { //如果是要编辑已有文章 //由Layout组件里定义的路由可知，如果是编辑文章，那么url里就有id，如果是发布新文章，那么url里就没有id，所以这里要根据url里是否有id来判断此时是“编辑已有文章”模式还是“发布新文章”模式
      await updateArticle({//参数格式详见接口文档
        ...values,
        cover: {
          type,
          images,
        },
        id: this.state.id,
      }, draft)
      message.success('修改成功')
    } else { //如果是要添加新文章
      await addArticle({//参数格式详见接口文档
        ...values,
        cover: {
          type,
          images,
        }
      }, draft)
      message.success('添加成功')
    }
    this.props.history.push('/home/list') //跳转到文章列表页面
    //window.location.reload() //这行是老子自己加的，这里是让页面刷新一次，否则页面跳转了、侧边栏的高亮却不跟着变化。但是这样做也不好，因为刷新页面会失去缓存，这样就失去单页面的优势了，但是我也不知道更好的做法是什么
  }

  onFinish = async (values) => { //提交表单之发布文章
    //console.log(values)
    this.save(values, false)
  }

  addDraft = async () => { //提交表单之添加草稿
    const values = await this.formRef.current.validateFields() //validateFields()是Form()组件的实例方法，详见2-9-18以及文档https://ant.design/components/form-cn/
    this.save(values, true)
  }
}
