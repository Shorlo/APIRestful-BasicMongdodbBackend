/*  APIRESTFUL-BASICMONGODBBACKEND/controllers/fruitController.js
       ____     __           _           _____        __
      / __/_ __/ /  ___ ____(_)__  ___  / ___/__  ___/ /__
 ___ _\ \/ // / _ \/ -_) __/ / _ `/ _ \/ /__/ _ \/ _  / -_)_____________________
|   /___/\_, /_.__/\__/_/ /_/\_,_/_//_/\___/\___/\_,_/\__/                      |
| Shorlo/___/                                                                   |
|                                                                               |
|   Copyright © 2022-2023 Javier Sainz de Baranda Goñi.                         |
|   Released under the terms of the GNU Lesser General Public License v3.       |
|                                                                               |
|   This program is free software: you can redistribute it and/or modify it     |
|   under the terms of the GNU General Public License as published by the Free  |
|   Software Foundation, either version 3 of the License, or (at your option)   |
|   any later version.                                                          |
|   This program is distributed in the hope that it will be useful, but         |
|   WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY  |
|   or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License     |
|   for more details.                                                           |
|                                                                               |
|   You should have received a copy of the GNU General Public License along     |
|   with this program. If not, see <http://www.gnu.org/licenses/>.              |
|                                                                               |
'==============================================================================*/

'use strict'

const Fruit = require('../models/Fruit');

function test(request, response)
{
    response.status(200).send
    ({
        status: 'Success',
        message: 'Checked basic api restful with mongodb.'
    });
}

function saveFruit(request, response)
{
    const fruit = new Fruit();

    const params = request.body;

    if(params.name)
    {
        fruit.name = params.name;
        fruit.color = params.color;
        fruit.season = params.season;
    }
    else
    {
        return response.status(404).send
        ({
            status:'Error',
            message: 'Missing data.',
        });
    }

    fruit.save().then((fruitStored) => 
    {
        if(!fruitStored || fruitStored.length <= 0)
        {
            return response.status(404).send
            ({
                status:'Error',
                message: 'Fruit to save not found.'
            });
        }
        return response.status(200).send
        ({
            status:'Success',
            message: 'Fruit save in database successfuly.',
            fruit: fruitStored
        });
    }).catch(() =>
    {
        return response.status(500).send
        ({
            status:'Error',
            message: 'Error saving fruit in database.'
        });
    });
}

function getFruits(request, response)
{
    Fruit.find({}).then((fruits) =>
    {
        if(!fruits || fruits.length <= 0)
        {
            return response.status(404).send
            ({
                status:'Error',
                message: 'Fruits not found in database.'
            });
        }
        return response.status(200).send
        ({
            status:'Success',
            fruits
        });
    }).catch(() =>
    {
        return response.status(500).send
        ({
            status:'Error',
            message: 'Error getting fruits from database.'
        });
    });
}

function getFruitsOrderById(request, response)
{
    Fruit.find({}).sort({'_id': -1}).then((fruits) =>
    {
        if(!fruits || fruits.length <= 0)
        {
            return response.status(404).send
            ({
                status:'Error',
                message: 'Fruits not found in database.'
            });
        }
        return response.status(200).send
        ({
            status:'Success',
            fruits
        });
    }).catch(() =>
    {
        return response.status(500).send
        ({
            status:'Error',
            message: 'Error getting fruits from database.'
        });
    });
}

module.exports = { test, saveFruit, getFruits, getFruitsOrderById }