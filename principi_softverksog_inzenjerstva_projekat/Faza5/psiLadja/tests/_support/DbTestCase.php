<?php namespace Tests\Support;

class DbTestCase extends \CodeIgniter\Test\CIDatabaseTestCase
{
	/**
	 * Should the database be refreshed before each test?
	 *
	 * @var boolean
	 */
	protected $refresh = true;


	/**
	 * The path to the seeds directory.
	 * Allows overriding the default application directories.
	 *
	 * @var string
	 */
	protected $basePath = SUPPORTPATH . 'Database/';

	/**
	 * Should run db migration?
	 *
	 * @var boolean
	 */
	protected $migrate = false;

	protected function regressDatabase()
	{
		$sql = file_get_contents($this->basePath . 'etf_vesti_sqlite.sql');
		$this->db->execute($sql);
	}
	
	public function setUp(): void
	{
		parent::setUp();
		// Extra code to run before each test
	}

	public function tearDown(): void
	{
		parent::tearDown();
		// Extra code to run after each test
	}
}
