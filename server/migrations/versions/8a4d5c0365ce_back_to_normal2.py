"""back to normal2

Revision ID: 8a4d5c0365ce
Revises: ae8222acb23a
Create Date: 2023-07-28 09:19:55.807084

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a4d5c0365ce'
down_revision = 'ae8222acb23a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('subwaystops_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_trips_subwaystopstart_id_subwaystops', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_trips_subwaystops_id_subwaystops'), 'subwaystops', ['subwaystops_id'], ['id'])
        batch_op.drop_column('subwaystopstart_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('subwaystopstart_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_trips_subwaystops_id_subwaystops'), type_='foreignkey')
        batch_op.create_foreign_key('fk_trips_subwaystopstart_id_subwaystops', 'subwaystops', ['subwaystopstart_id'], ['id'])
        batch_op.drop_column('subwaystops_id')

    # ### end Alembic commands ###
