import * as coreConfig from 'app/core/core-config';

export class Serializer {

  static deserialize(objects: any) {
    const rs = {};
    let value, fieldName;

    for (const key in objects) {
      if (objects.hasOwnProperty(key)) {
        value = objects[key];
        if (typeof objects[key] === 'object') {
          let isObject = true;
          const arrValues = [];
          // if value is array
          if (value instanceof Array) {
            isObject = false;
            // each array to convert field name
            value.forEach((item, index) => {
              const val = this.deserialize(item);
              arrValues.push(val);
            });
          } else {
            value = this.deserialize(value);
          }
          fieldName = this.getFieldName(key);
          rs[fieldName] = isObject ? value : arrValues;
        } else {
          fieldName = this.getFieldName(key);
          rs[fieldName] = value;
        }
      }
    }
    return rs;
  }

  private static convertCamelCased(fieldName: string): string {
    const camelCased = fieldName.replace(/_([a-z])/g, function (g) {
                                                        return g[1].toUpperCase();
                                                      });
    return camelCased;
  }

  private static getFieldName(key: string): string {
    return coreConfig.MAP_FIELDS[key] || this.convertCamelCased(key);
  }

}
