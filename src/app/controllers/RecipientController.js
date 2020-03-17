import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      } = await Recipient.create(req.body);
      return res.json({
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'the action could not be performed' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    req.body.id = req.params.id;

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails' });
    }

    try {
      const recipient = await Recipient.findByPk(req.body.id);

      if (!recipient) {
        return res.status(401).json({ error: 'Recipient does not exists' });
      }

      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      } = await recipient.update(req.body);
      return res.json({
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'the action could not be performed' });
    }
  }
}

export default new RecipientController();
