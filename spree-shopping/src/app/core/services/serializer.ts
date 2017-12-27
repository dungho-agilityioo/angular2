import * as coreConfig from 'app/core/core-config';

export class Serializer {
  static rs = {};

  static deserialize(objects: any) {
    const rs = {};
    let value, fieldName;

    for (const key in objects) {
      if (objects.hasOwnProperty(key)) {
        value = objects[key];
        if (typeof objects[key] === 'object') {
          value = this.deserialize(objects[key]);
        }
        fieldName = coreConfig.MAP_FIELDS[key] || this.convertCamelCased(key);
        rs[fieldName] = value;
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

}
