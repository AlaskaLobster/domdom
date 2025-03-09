<?php

namespace Database\Factories;

use App\Models\HocSinh;
use Illuminate\Database\Eloquent\Factories\Factory;

class HocSinhFactory extends Factory
{
    protected $model = HocSinh::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'age' => $this->faker->numberBetween(6, 18),
            // Add other fields as necessary
        ];
    }
}
