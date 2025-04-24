import pytest
import src.util.dao as dao
from src.util.dao import DAO
from pymongo.errors import WriteError

@pytest.fixture(autouse=True)
def mock_get_validator(monkeypatch):
    """
    Auto-mock getValidator in dao so tests don't read JSON files.
    Returns the stubValidator so individual tests can override its contents.
    """
    stubValidator ={
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "description"
        ],
        "properties": {
            "description": {
                "bsonType": "string",
                "description": "the description of a todo must be determined",
                "uniqueItems": True
            },
            "done": {
                "bsonType": "bool"
            }
        }
    }
}
    monkeypatch.setattr(dao, "getValidator", lambda name: stubValidator)
    return stubValidator

@ pytest.fixture(scope="function")
def test_db(monkeypatch):
    """Connect to the test MongoDB and return a DAO instance for the 'test_todo' collection."""
    test_url = "mongodb://root:root@localhost:27017/rootDb?authSource=admin"
    monkeypatch.setenv("MONGO_URL", test_url)
    return DAO("test_todo")

def test_create_valid_data(test_db):
    data = {"description": "ok", "done": True}
    result = test_db.create(data)
    assert result["description"] == "ok"
    assert result["done"] is True
    assert "_id" in result

def test_create_missing_field(test_db):
    data = {"done": True}
    with pytest.raises(WriteError):
        test_db.create(data)

def test_create_invalid_type(test_db):
    data = {"description": "ok", "done": "not_a_boolean"}
    with pytest.raises(WriteError):
        test_db.create(data)

def test_create_duplicate_unique(test_db):
    data = {"description": "ok", "done": True}
    test_db.create(data)
    with pytest.raises(WriteError):
        test_db.create(data)
