<?php
namespace App\Models;

use App\Models\Korisnik;

class KorisnikModelTest extends \Tests\Support\DbTestCase
{
	/**
	 * The seed file(s) used for all tests within this test case.
	 * Should be fully-namespaced or relative to $basePath
	 *
	 * @var string|array
	 */
	protected $seed = 'Tests\Support\Database\Seeds\KorisnikSeeder';

	public function testModelFindAll()
	{
		$model = new Korisnik();

		// Get every row created by ExampleSeeder
		$objects = $model->findAll();

		// Make sure the count is as expected
		$this->assertCount(3, $objects);
	}

}
