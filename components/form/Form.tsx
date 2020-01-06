import React from 'react'
import { Form as AntForm, Row, Col, Input } from 'antd'
import { WrappedFormUtils, ValidationRule, FormComponentProps } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/grid/col';

type EditorComponent = {

    /**
     * 组件的唯一名称
     */
    name: string

    /**
     * 当前的组件实列
     */
    component: JSX.Element

    /**
     * 当前组件的校验规则
     */
    rules?: ValidationRule[]

    /**
     * 默认值
     */
    initialValue?: any
}


type Props = {

    /**
     * 语义话脚本来进行布局
     * 
     * ------------------------
     * 1. 表示当前列的名称
     * 2. 表示当前表单的输入类型
     * 3. 表示当前表单占用第几格
     *    - 如果不写第4个参数，则表示占用剩下的空间
     * ------------------------
     * 
     * [name input]+12 [name input] [name input]
     * [name input]    [name input] [name input]
     */
    script: string

    labelCol?: ColProps

    wrapperCol?: ColProps

    /**
     * 注册的组件信息,所有注册的组件都可以在语义化脚本中进行布局操作
     */
    components?: EditorComponent[]

    form?: WrappedFormUtils

}

type State = {

}

class FormItemProps {
    name: string
    span: number
    label: string
    component: EditorComponent | undefined
}

class Form extends React.Component<Props & FormComponentProps, State> {

    state = {

    }

    // 当前节点上拥有的组件
    components:EditorComponent[] = []

    
    static defaultProps = {
        components: [],
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 0 },
            sm: { span: 20 },
        },

    }
    constructor(props: Props & FormComponentProps) {
        super(props);
    }

    componentWillMount(){
        this.props.components?.forEach((component)=>{
            this.components.push(component)
        })
        // 添加默认的输入框
        this.components.push({
            name: 'input',
            component: <Input />
        })
       
    }

    /**
     * 将脚本信息，转换为json对象
     */
    protected getScriptToJsonArray(): FormItemProps[][] {
        const { script } = this.props
        const { components } = this
        try {
            const splitScript = script.trim().split('\n')
            const respArray: FormItemProps[][] = []
            splitScript.forEach((singleRowScript) => {
                const matchs = singleRowScript.matchAll(/\[.*?\]/g)
                const rowData: FormItemProps[] = []
                for (const realString of matchs) {
                    const config = realString.pop()
                    if (config) {
                        const realConfig = config.replace('\[', '').replace('\]', '').split(/\s/g)
                        const fromItemProps = new FormItemProps()

                        // 添加名称
                        fromItemProps.name = realConfig[0].split('|')[0]
                        fromItemProps.label =  realConfig[0].split('|')[1]

                        // 添加组件
                        fromItemProps.component = components?.filter((component) => { 
                            debugger
                            return component.name.trim() === realConfig[1].trim()
                         })[0]

                        // START 设置当前组件的span大小
                        if (realConfig[2] === undefined) {
                            let span = 24
                            rowData.forEach((colData) => {
                                span = - colData.span
                            })
                            fromItemProps.span = span
                        } else {
                            fromItemProps.span = Number.parseInt(realConfig[2])
                        }
                        // END
                        rowData.push(fromItemProps)
                    }
                }
                respArray.push(rowData)
            })
            return respArray
        } catch (error) {
            console.error("Failed to parse script: \n" + script)
            throw error
        }
    }

    // 解析生成form节点
    renderFormItems():JSX.Element[]  {
        const formItemsProps = this.getScriptToJsonArray()
        const formItems:JSX.Element[] = []
        const { form } = this.props
        formItemsProps.forEach((itemProps) => {
            const cols:JSX.Element[] = []
            itemProps.forEach((itemCol) => {
                const col:JSX.Element = (
                    <Col span={itemCol.span}>
                         <AntForm.Item
                            label={itemCol.label}
                         >
                            {form?.getFieldDecorator(itemCol.name, {
                                rules: itemCol.component?.rules,
                                initialValue: itemCol.component?.initialValue,
                            })(itemCol.component?.component)}
                         </AntForm.Item>
                    </Col>
                )
                cols.push(col)
            })
            formItems.push((
                <Row>
                    {cols}
                </Row>
            ))
        })
        return formItems
    }


    render() {
        const {labelCol , wrapperCol} = this.props
        return (
            <AntForm
                labelCol = {labelCol}
                wrapperCol= {wrapperCol}
            >
                {
                    this.renderFormItems()
                }
            </AntForm>
        )
    }
}


const ScriptForm = AntForm.create<Props & FormComponentProps>()(Form);

export { ScriptForm as Form };