import Handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider
    implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const parseTemplate = Handlebars.compile(template);

        return parseTemplate(variables);
    }
}
