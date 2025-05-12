import React from 'react';

interface Param {
  id: number;
  name: string;
  type?: 'string' | 'number' | 'select';
  options?: string[]
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface ParamValue {
  paramId: number;
  value: string | number;
}

interface Props {
  params: Param[]
  model: Model
}

interface State {
  paramValues: ParamValue[]
}

interface Color { }

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues || [],
    };
  }

  getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors || [],
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, paramId: number) => {
    const newValue = event.target.value;

    this.setState(prevState => {
      const updatedParamValues = prevState.paramValues.map(paramValue => paramValue.paramId === paramId ? { ...paramValue, value: newValue } : paramValue);
      return { paramValues: updatedParamValues };
    });
  };

  inputField = (param: Param, paramValue: ParamValue | undefined) => {
    switch (param.type) {
      case 'number':
        return <input type="number" value={paramValue ? paramValue.value : ''} onChange={(event) => this.handleInputChange(event, param.id)} />
      case 'select':
        return <select value={paramValue ? paramValue.value : ''} onChange={(event) => this.handleInputChange(event, param.id)}>
          <option value={param.name}>{param.name}</option>
          {param.options?.map((option, i) => (
            <option key={option + i} value={option}>
              {option}
            </option>
          ))}
        </select>
      default:
        return <input type="text" value={paramValue ? paramValue.value : ''} onChange={(event) => this.handleInputChange(event, param.id)} />
    }
  }


  render() {
    return <>
      {this.props.params.map(param => {
        const paramValue = this.state.paramValues.find(pv => pv.paramId === param.id);
        return (
          <div key={param.id}>
            <label>{param.name}</label>
            {this.inputField(param, paramValue)}
            <button onClick={()=>console.log(this.getModel())}>getvodel</button>
          </div>
        );
      })}
    </>
  }
}

